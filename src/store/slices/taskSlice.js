import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8000/api/tasks");
      if (!res.data || !res.data.success) {
        return rejectWithValue(res.data?.message || "Fetch failed");
      }
      return res.data.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message || "Fetch failed");
      }
      return rejectWithValue(err.message || "Fetch failed");
    }
  }
);

// Create a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (newTask, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8000/api/tasks", newTask);
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
  }
);

// Update a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/tasks/${task._id }`,
        task
      );
      if (!res.data || !res.data.success) {
        return rejectWithValue(res.data?.message || "Update failed");
      }
      return res.data.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message || "Update failed");
      }
      return rejectWithValue(err.message || "Update failed");
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
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
  }
);

// Get comments of a task
export const getComments = createAsyncThunk(
  "tasks/getComments",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/comments/${taskId}`);
      if (!res.data || !res.data.success) {
        return rejectWithValue(res.data?.message || "Get comments failed");
      }
      return { taskId, comments: res.data.data };
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message || "Get comments failed");
      }
      return rejectWithValue(err.message || "Get comments failed");
    }
  }
);


// create comment of a task
export const createComment= createAsyncThunk(
  "comments/createComment",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/comments/${taskId}`, taskId);
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
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "tasks/deleteComment",
  async ({ taskId, commentId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/comments/${commentId}`
      );
      if (!res.data || !res.data.success) {
        return rejectWithValue(res.data?.message || "Delete comment failed");
      }
      return { taskId, commentId };
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message || "Delete comment failed");
      }
      return rejectWithValue(err.message || "Delete comment failed");
    }
  }
);

// Update a comment
export const updateComment = createAsyncThunk(
  "tasks/updateComment",
  async ({ taskId, commentId, content }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/comments/${commentId}`,
        { content }
      );
      if (!res.data || !res.data.success) {
        return rejectWithValue(res.data?.message || "Update comment failed");
      }
      return { taskId, comment: res.data.data };
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message || "Update comment failed");
      }
      return rejectWithValue(err.message || "Update comment failed");
    }
  }
);

// Reply to a comment
export const replyComment = createAsyncThunk(
  "tasks/replyComment",
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/comments/${commentId}/reply`,
        { content }
      );
      if (!res.data || !res.data.success) {
        return rejectWithValue(res.data?.message || "Reply comment failed");
      }
      return { taskId, commentId, reply: res.data.data };
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message || "Reply comment failed");
      }
      return rejectWithValue(err.message || "Reply comment failed");
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    updateError: null,
    updateSuccess: false,
  },
  reducers: {
    clearUpdateStatus(state) {
      state.updateError = null;
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createTask
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateTask
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.updateError = null;
        state.updateSuccess = true;
        const idx = state.tasks.findIndex(
          (t) => t._id === action.payload._id || t.id === action.payload.id
        );
        if (idx !== -1) {
          state.tasks[idx] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.updateError = action.payload || "Update task failed";
        state.updateSuccess = false;
      })
      // deleteTask
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((t) => t._id !== action.payload && t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getComments
      .addCase(getComments.fulfilled, (state, action) => {
        const { taskId, comments } = action.payload;
        const idx = state.tasks.findIndex((t) => t._id === taskId || t.id === taskId);
        if (idx !== -1) {
          state.tasks[idx].comments = comments;
        }
      })
      // createComment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deleteComment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { taskId, commentId } = action.payload;
        const idx = state.tasks.findIndex((t) => t._id === taskId || t.id === taskId);
        if (idx !== -1 && Array.isArray(state.tasks[idx].comments)) {
          state.tasks[idx].comments = state.tasks[idx].comments.filter(
            (c) => c._id !== commentId && c.id !== commentId
          );
        }
      })
      // updateComment
      .addCase(updateComment.fulfilled, (state, action) => {
        const { taskId, comment } = action.payload;
        const idx = state.tasks.findIndex((t) => t._id === taskId || t.id === taskId);
        if (idx !== -1 && Array.isArray(state.tasks[idx].comments)) {
          const cIdx = state.tasks[idx].comments.findIndex(
            (c) => c._id === comment._id || c.id === comment.id
          );
          if (cIdx !== -1) {
            state.tasks[idx].comments[cIdx] = comment;
          }
        }
      });
  },
});

export const { clearUpdateStatus } = taskSlice.actions;
export default taskSlice.reducer;
