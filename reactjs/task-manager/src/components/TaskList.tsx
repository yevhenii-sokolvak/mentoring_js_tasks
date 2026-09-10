import { useMemo } from 'react';
import Task from './Task';
import TaskAdd from './TaskAdd';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import List from './List';
import useTasks from '../hooks/useTasks';
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
  const {
    addTask,
    toggleTask,
    deleteTask,
    clearAll,
    filteredTasks,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
  } = useTasks();

  const groupedTasks = useMemo(
    () => groupByCategory(filteredTasks),
    [filteredTasks]
  );

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-3 px-4">
      <TaskAdd onAddTask={addTask} />

      <button
        type="button"
        onClick={clearAll}
        className="text-sm text-red-600 hover:text-red-800 font-medium mb-2 cursor-pointer"
      >
        Очистити всі
      </button>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <FilterBar value={filter} onChange={setFilter} />

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-6">
          Нічого не знайдено
        </p>
      ) : (
        Object.values(TaskCategory).map((category) => {
          const items = groupedTasks[category];
          if (items.length === 0) return null;

          return (
            <div key={category} className="mb-6">
              <h2 className="text-md font-bold text-gray-700 mb-2">
                {category} ({items.length})
              </h2>
              <div className="space-y-3">
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
                      onToggle={() => toggleTask(task.id)}
                      onDelete={() => deleteTask(task.id)}
                    />
                  )}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default TaskList;