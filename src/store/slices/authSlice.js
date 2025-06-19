import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_API_URL}/users`; // Update with your backend URL

// Async thunks
export const login = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Đăng nhập thất bại",
      );
    }
  },
);

export const register = createAsyncThunk(
  "register",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        username,
      });
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Đăng ký thất bại",
      );
    }
  },
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          `${API_URL}/signout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
      localStorage.removeItem("token");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Đăng xuất thất bại",
      );
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Không tìm thấy token");
      }
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể lấy thông tin người dùng",
      );
    }
  },
);

export const getUserByEmail = createAsyncThunk(
  "getUserByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Không tìm thấy token");
      }
      const response = await axios.get(`${API_URL}/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tìm người dùng",
      );
    }
  },
);

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      });
    // Get User By Email
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
