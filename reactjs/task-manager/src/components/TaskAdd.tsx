import { useState } from 'react'; 
import type TaskItem from '../types/types';

function TaskAdd({ onAddTask }: { onAddTask: (task: TaskItem) => void }) {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const resetTaskAddForm = () => {
      setNewTitle('');
      setNewDescription('');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!newTitle.trim()) return;

      onAddTask({
          title: newTitle.trim(),
          description: newDescription,
          isCompleted: false,
      });

      resetTaskAddForm();
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6 space-y-3"
      >
      <h2 className="text-lg font-semibold text-gray-800">Нова задача</h2>

      <input
        type="text"
        placeholder="Назва задачі"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Опис задачі"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={2}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Додати задачу
      </button>
      </form>
    );
}

export default TaskAdd;