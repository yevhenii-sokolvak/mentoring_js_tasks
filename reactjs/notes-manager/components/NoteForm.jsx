import { useState } from 'react';
import { CATEGORIES } from '../src/constants/CONSTANTS';

function NoteForm({ onAddNote }) {
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newCategory, setNewCategory] = useState('personal');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newTitle.trim()) return;

        onAddNote({
            id: crypto.randomUUID(),
            title: newTitle,
            content: newContent,
            category: newCategory,
        });
    };

    return (
        <div className="mb-4">
            Add new note
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-2 border border-gray-300 p-4 rounded"
            >
                <input 
                    type="text" 
                    className="border border-gray-300 p-2 rounded" id="note-name" placeholder="Enter note name..." required 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea 
                    className="border border-gray-300 p-2 rounded" id="note-content" placeholder="Enter note content..." 
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                ></textarea>
                <select 
                    className="border border-gray-300 p-2 rounded" id="note-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                >
                    {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default NoteForm;