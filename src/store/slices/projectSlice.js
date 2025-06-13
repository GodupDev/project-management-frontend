import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/projects";

// Async thunks
export const createProject = createAsyncThunk(
  "project/create",
  async (projectData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API_URL, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create project",
      );
    }
  },
);

export const getAllProjects = createAsyncThunk(
  "project/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get projects",
      );
    }
  },
);

export const getProjectById = createAsyncThunk(
  "project/getById",
  async (projectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get project",
      );
    }
  },
);

export const updateProject = createAsyncThunk(
  "project/update",
  async ({ projectId, projectData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/${projectId}`, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update project",
      );
    }
  },
);

export const deleteProject = createAsyncThunk(
  "project/delete",
  async (projectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return projectId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete project",
      );
    }
  },
);

export const addProjectMembers = createAsyncThunk(
  "project/addMembers",
  async ({ projectId, members }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/${projectId}/members`,
        { members },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add members",
      );
    }
  },
);

export const getProjectMembers = createAsyncThunk(
  "project/getMembers",
  async (projectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/${projectId}/members`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get members",
      );
    }
  },
);

export const updateProjectMember = createAsyncThunk(
  "project/updateMember",
  async ({ projectId, memberId, memberData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/${projectId}/members/${memberId}`,
        memberData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update member",
      );
    }
  },
);

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        // Check if project already exists
        const exists = state.projects.some(
          (p) => p.projectName === action.payload.projectName,
        );
        if (!exists) {
          state.projects.push(action.payload);
        }
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Projects
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Project By Id
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.currentProject?._id === action.payload._id) {
          state.currentProject = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((p) => p._id !== action.payload);
        if (state.currentProject?._id === action.payload) {
          state.currentProject = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Project Members
      .addCase(addProjectMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProjectMembers.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentProject) {
          state.currentProject.members = action.payload;
        }
      })
      .addCase(addProjectMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Project Members
      .addCase(getProjectMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectMembers.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentProject) {
          state.currentProject.members = action.payload;
        }
      })
      .addCase(getProjectMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Project Member
      .addCase(updateProjectMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectMember.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentProject) {
          const index = state.currentProject.members.findIndex(
            (m) => m._id === action.payload._id,
          );
          if (index !== -1) {
            state.currentProject.members[index] = action.payload;
          }
        }
      })
      .addCase(updateProjectMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
