import {useState, useEffect, useMemo} from 'react';
import Task from './Task';
import TaskAdd from './TaskAdd';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import type TaskItem from '../types/types';
import type { FilterStatus } from '../types/types';

const STORAGE_KEY = 'tasks';

const defaultTasks: TaskItem[] = [
  {
    id: crypto.randomUUID(),
    title: 'Вивчити пропси',
    description: 'Розібратись, як передавати дані у компоненти',
    isCompleted: true,
  },
  {
    id: crypto.randomUUID(),
    title: 'Додати Tailwind',
    description: 'Налаштувати стилізацію проекту',
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Додати React Router',
    description: 'Налаштувати маршрутизацію у проекті',
    isCompleted: false,
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

function TaskList() {
  const [tasks, setTasks] = useState<TaskItem[]>(loadTasksFromStorage);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
      .filter((task) => {
        if (filterStatus === 'active') return !task.isCompleted;
        if (filterStatus === 'completed') return task.isCompleted;
        return true;
      });
  }, [tasks, searchQuery, filterStatus]);

  const handleToggle = (taskToToggle: TaskItem): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task === taskToToggle ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleAddTask = (newTask: TaskItem): void => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: crypto.randomUUID() },
    ]);
  };

  const handleClearAll = (): void => {
    setTasks([]);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-3 px-4">
      <TaskAdd onAddTask={handleAddTask} />

      <button
        type="button"
        onClick={handleClearAll}
        className="text-sm text-red-600 hover:text-red-800 font-medium mb-2 cursor-pointer"
      >Очистити всі</button>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <FilterBar value={filterStatus} onChange={setFilterStatus} />

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-6">
          Нічого не знайдено
        </p>
      ) : (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            onToggle={() => handleToggle(task)}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;