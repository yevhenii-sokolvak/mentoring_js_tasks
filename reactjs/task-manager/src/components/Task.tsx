import type TaskItem from '../types/types';

interface TaskProps extends TaskItem {
  onToggle: () => void;
  onDelete: () => void;
}

function Task({
  id,
  title,
  description,
  isCompleted = false,
  category,
  onToggle,
  onDelete,
}: TaskProps) {
  return (
    <div
      id={id}
      className={`p-4 rounded-lg shadow-md border mb-3 ${
        isCompleted ? 'bg-green-50 border-green-300' : 'bg-white border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-2 gap-2">
        <h3
          className={`flex-1 text-lg font-semibold ${
            isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {title}
        </h3>

        <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800">
          {category}
        </span>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            isCompleted
              ? 'bg-green-200 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {isCompleted ? 'Виконано' : 'Активна'}
        </span>

        <input
          type="checkbox"
          checked={isCompleted}
          onChange={onToggle}
          className="w-4 h-4 accent-green-600 cursor-pointer"
        />

        <button
          type="button"
          onClick={onDelete}
          aria-label="Видалити задачу"
          className="text-gray-400 hover:text-red-600 text-sm cursor-pointer"
        >
          ✕
        </button>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default Task;