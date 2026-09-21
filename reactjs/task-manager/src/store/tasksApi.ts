import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type TaskItem from '../types/types';
import { apiFetchTasks, apiCreateTask, apiUpdateTask, apiDeleteTask } from '../api/tasks';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fakeBaseQuery<string>(),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query<TaskItem[], void>({
      async queryFn() {
        try {
          const data = await apiFetchTasks();
          return { data };
        } catch (err) {
          return { error: 'Не вдалося завантажити задачі' };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((task) => ({ type: 'Task' as const, id: task.id })),
              { type: 'Task' as const, id: 'LIST' },
            ]
          : [{ type: 'Task' as const, id: 'LIST' }],
    }),

    addTask: builder.mutation<TaskItem, Omit<TaskItem, 'id'>>({
      async queryFn(newTask) {
        try {
          const data = await apiCreateTask(newTask);
          return { data };
        } catch (err) {
          return { error: 'Не вдалося додати задачу' };
        }
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    updateTask: builder.mutation<TaskItem, TaskItem>({
      async queryFn(task) {
        try {
          const data = await apiUpdateTask(task);
          return { data };
        } catch (err) {
          return { error: 'Не вдалося оновити задачу' };
        }
      },
      invalidatesTags: (result, error, task) => [{ type: 'Task', id: task.id }],
    }),

    deleteTask: builder.mutation<string, string>({
      async queryFn(id) {
        try {
          const data = await apiDeleteTask(id);
          return { data };
        } catch (err) {
          return { error: 'Не вдалося видалити задачу' };
        }
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;