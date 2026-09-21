import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type TaskItem from '../types/types';
import { apiFetchTasks, apiCreateTask, apiDeleteTask } from '../api/tasks';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    return await apiFetchTasks();
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (newTask: Omit<TaskItem, 'id'>) => {
    return await apiCreateTask(newTask);
  }
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id: string) => {
    return await apiDeleteTask(id);
  }
);

interface TasksState {
  items: TaskItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<TaskItem[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не вдалося завантажити задачі';
      })
      // createTask
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<TaskItem>) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не вдалося додати задачу';
      })
      // removeTask
      .addCase(removeTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не вдалося видалити задачу';
      });
  },
});

export const { toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;