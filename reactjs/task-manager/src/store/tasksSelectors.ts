import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { TaskCategory } from '../types/types';

// "Базові" селектори — просто дістають шматок стану без обчислень
const selectAllTasks = (state: RootState) => state.tasks.items;
const selectSearchQuery = (state: RootState) => state.ui.searchQuery;
const selectFilter = (state: RootState) => state.ui.filter;

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectSearchQuery, selectFilter],
  (tasks, searchQuery, filter) => {
    return tasks
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
      .filter((task) => {
        if (filter === 'active') return !task.isCompleted;
        if (filter === 'completed') return task.isCompleted;
        return true;
      });
  }
);

export const selectTasksByCategory = createSelector(
  [selectFilteredTasks],
  (filteredTasks) => {
    const groups = {
      [TaskCategory.Work]: [],
      [TaskCategory.Study]: [],
      [TaskCategory.Personal]: [],
    } as Record<TaskCategory, typeof filteredTasks>;

    filteredTasks.forEach((task) => {
      groups[task.category].push(task);
    });

    return groups;
  }
);

export const selectStats = createSelector(
  [selectAllTasks],
  (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.isCompleted).length;
    return {
      total,
      completed,
      active: total - completed,
    };
  }
);