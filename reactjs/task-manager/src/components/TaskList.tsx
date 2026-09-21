import { useMemo } from 'react';
import Task from './Task';
import TaskAdd from './TaskAdd';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import List from './List';
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../store/tasksApi';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSearchQuery, setFilter } from '../store/uiSlice';
import type TaskItem from '../types/types';
import { TaskCategory } from '../types/types';

function groupByCategory(tasks: TaskItem[]): Record<TaskCategory, TaskItem[]> {
  const groups = {
    [TaskCategory.Work]: [],
    [TaskCategory.Study]: [],
    [TaskCategory.Personal]: [],
  } as Record<TaskCategory, TaskItem[]>;

  tasks.forEach((task) => {
    groups[task.category].push(task);
  });

  return groups;
}

function TaskList() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);
  const filter = useAppSelector((state) => state.ui.filter);

  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

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

  const groupedTasks = useMemo(() => groupByCategory(filteredTasks), [filteredTasks]);

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-3 px-4">
      <TaskAdd onAddTask={(task) => addTask(task)} />

      {isLoading && <p className="text-center text-blue-500 text-sm py-2">Завантаження...</p>}
      {isError && (
        <p className="text-center text-red-600 text-sm py-2" role="alert">
          Не вдалося завантажити задачі
        </p>
      )}

      <SearchBar value={searchQuery} onChange={(value) => dispatch(setSearchQuery(value))} />
      <FilterBar value={filter} onChange={(value) => dispatch(setFilter(value))} />

      {Object.values(TaskCategory).map((category) => {
        const items = groupedTasks[category];
        if (items.length === 0) return null;

        return (
          <div key={category} className="mb-6">
            <h2 className="text-md font-bold text-gray-700 mb-2">
              {category} ({items.length})
            </h2>
            <List<TaskItem>
              items={items}
              keyExtractor={(task) => task.id}
              renderItem={(task) => (
                <Task
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  isCompleted={task.isCompleted}
                  category={task.category}
                  onToggle={() => updateTask({ ...task, isCompleted: !task.isCompleted })}
                  onDelete={() => deleteTask(task.id)}
                />
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;