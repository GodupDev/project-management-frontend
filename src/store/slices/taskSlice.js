import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Fetch all tasks with pagination and filters
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, ...filters } = params;

      // Build query string from filters
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters,
      }).toString();

      const url = `/tasks?${queryParams}`;
      const res = await api.get(url);

      if (!res.data || !res.data.success) {
        return rejectWithValue(res.data?.message || "Fetch failed");
      }

      // Return normalized response
      return {
        tasks: res.data.data || [],
        allProjects: res.data.allProjects || [],
        pagination: {
          total: res.data.pagination?.totalItems || 0,
          page: res.data.pagination?.page || page,
          limit: res.data.pagination?.limit || limit,
          totalPages: res.data.pagination?.totalPages || 1,
        },
      };
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message || "Fetch failed");
      }
      return rejectWithValue(err.message || "Fetch failed");
    }
  },
);

// Create a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (newTask, { rejectWithValue }) => {
    try {
      const res = await api.post("/tasks", newTask);
      if (!res.data || !res.data.success) {
        return rejectWithValue(res.data?.message || "Create failed");
      }
      return res.data.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message || "Create failed");
      }
      return rejectWithValue(err.message || "Create failed");
    }
  },
);

// Update an existing task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/tasks/${id}`, taskData);
      if (!response.data || !response.data.success) {
        return rejectWithValue(
          response.data?.message || "Cập nhật công việc thất bại",
        );
      }
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error?.message ||
        "Đã xảy ra lỗi khi cập nhật công việc";
      return rejectWithValue(errorMessage);
    }
  },
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/tasks/${taskId}`);
      if (!res.data || !res.data.success) {
        return rejectWithValue(res.data?.message || "Delete failed");
      }
      return taskId;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message || "Delete failed");
      }
      return rejectWithValue(err.message || "Delete failed");
    }
  },
);

// Fetch task by ID
export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/tasks/${taskId}`);
      if (!res.data || !res.data.success) {
        return rejectWithValue(res.data?.message || "Fetch task failed");
      }
      return res.data.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(
          err.response.data.message || "Fetch task failed",
        );
      }
      return rejectWithValue(err.message || "Fetch task failed");
    }
  },
);

const initialState = {
  tasks: [],
  allProjects: [],
  pagination: {},
  currentTask: null,
  loading: false,
  error: null,
  status: {
    fetch: "idle",
    create: "idle",
    update: "idle",
    delete: "idle",
    fetchById: "idle",
  },
  updateStatus: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearUpdateStatus: (state) => {
      state.updateStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status.fetch = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.status.fetch = "succeeded";
        state.tasks = action.payload.tasks;
        state.allProjects = action.payload.allProjects || [];
        state.pagination = action.payload.pagination || {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
        };
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.status.fetch = "failed";
        state.error = action.payload || "Failed to fetch tasks";
        // Keep the previous tasks and pagination on error
      })
      // createTask
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status.create = "loading";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.status.create = "succeeded";
        state.tasks.unshift(action.payload);
        state.updateStatus = {
          type: "success",
          message: "Task created successfully",
        };
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.status.create = "failed";
        state.error = action.payload || "Failed to create task";
        state.updateStatus = {
          type: "error",
          message: action.payload || "Failed to create task",
        };
      })
      // updateTask
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status.update = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.status.update = "succeeded";
        const updatedTask = action.payload;
        const taskIndex = state.tasks.findIndex(
          (t) => t._id === updatedTask._id,
        );
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = updatedTask;
        } else {
          state.tasks.unshift(updatedTask);
        }
        if (state.currentTask?._id === updatedTask._id) {
          state.currentTask = updatedTask;
        }
        state.updateStatus = {
          type: "success",
          message: "Task updated successfully",
        };
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.status.update = "failed";
        state.error = action.payload || "Failed to update task";
        state.updateStatus = {
          type: "error",
          message: action.payload || "Failed to update task",
        };
      })
      // deleteTask
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status.delete = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.status.delete = "succeeded";
        state.tasks = state.tasks.filter(
          (t) => t._id !== action.payload && t.id !== action.payload,
        );
        if (state.currentTask?._id === action.payload) {
          state.currentTask = null;
        }
        state.updateStatus = {
          type: "success",
          message: "Task deleted successfully",
        };
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.status.delete = "failed";
        state.error = action.payload || "Failed to delete task";
        state.updateStatus = {
          type: "error",
          message: action.payload || "Failed to delete task",
        };
      })
      // fetchTaskById
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status.fetchById = "loading";
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.status.fetchById = "succeeded";
        state.currentTask = action.payload;
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.status.fetchById = "failed";
        state.error = action.payload || "Failed to fetch task details";
      });
  },
});

export const { clearUpdateStatus } = taskSlice.actions;
export default taskSlice.reducer;
