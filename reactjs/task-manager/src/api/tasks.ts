import type TaskItem from '../types/types';
import { TaskCategory } from '../types/types';

const STORAGE_KEY = 'tasks-v2';
const FAKE_DELAY_MS = 800;

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
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readFromStorage(): TaskItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultTasks;
  } catch {
    return defaultTasks;
  }
}

function writeToStorage(tasks: TaskItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export async function apiUpdateTask(updated: TaskItem): Promise<TaskItem> {
  await delay(FAKE_DELAY_MS);
  const tasks = readFromStorage();
  const next = tasks.map((t) => (t.id === updated.id ? updated : t));
  writeToStorage(next);
  return updated;
}

export async function apiFetchTasks(): Promise<TaskItem[]> {
  await delay(FAKE_DELAY_MS);
  return readFromStorage();
}

export async function apiCreateTask(newTask: Omit<TaskItem, 'id'>): Promise<TaskItem> {
  await delay(FAKE_DELAY_MS);
  const tasks = readFromStorage();
  const created: TaskItem = { ...newTask, id: crypto.randomUUID() };
  writeToStorage([...tasks, created]);
  return created;
}

export async function apiDeleteTask(id: string): Promise<string> {
  await delay(FAKE_DELAY_MS);
  const tasks = readFromStorage();
  writeToStorage(tasks.filter((t) => t.id !== id));
  return id;
}