function Task({ title, description, isCompleted }) {
  return (
    <div
      className={`p-4 rounded-lg shadow-md border mb-3 ${
        isCompleted ? 'bg-green-50 border-green-300' : 'bg-white border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3
          className={`text-lg font-semibold ${
            isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {title}
        </h3>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            isCompleted
              ? 'bg-green-200 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {isCompleted ? 'Виконано' : 'В процесі'}
        </span>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default Task;