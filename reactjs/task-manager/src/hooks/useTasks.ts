import { useState, useEffect, useMemo, useCallback } from 'react';
import type TaskItem from '../types/types';
import type { FilterStatus } from '../types/types';
import { TaskCategory } from '../types/types';

const STORAGE_KEY = 'tasks';

const defaultTasks: TaskItem[] = [
  {
    id: crypto.randomUUID(),
    title: 'Вивчити пропси',
    description: 'Розібратись, як передавати дані у компоненти',
    isCompleted: true,
    category: TaskCategory.Study,
  },
  {
    id: crypto.randomUUID(),
    title: 'Додати Tailwind',
    description: 'Налаштувати стилізацію проекту',
    isCompleted: false,
    category: TaskCategory.Work,
  },
  {
    id: crypto.randomUUID(),
    title: 'Додати React Router',
    description: 'Налаштувати маршрутизацію у проекті',
    isCompleted: false,
    category: TaskCategory.Work,
  },
];

function loadTasksFromStorage(): TaskItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultTasks;
  } catch {
    return defaultTasks;
  }
}

interface UseTasksReturn {
  tasks: TaskItem[];
  addTask: (task: TaskItem) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearAll: () => void;
  filteredTasks: TaskItem[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filter: FilterStatus;
  setFilter: (value: FilterStatus) => void;
}

function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<TaskItem[]>(loadTasksFromStorage);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((newTask: TaskItem): void => {
    setTasks((prev) => [...prev, { ...newTask, id: crypto.randomUUID() }]);
  }, []);

  const toggleTask = useCallback((id: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const clearAll = useCallback((): void => {
    setTasks([]);
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
      .filter((task) => {
        if (filter === 'active') return !task.isCompleted;
        if (filter === 'completed') return task.isCompleted;
        return true;
      });
  }, [tasks, searchQuery, filter]);

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    clearAll,
    filteredTasks,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
  };
}

export default useTasks;