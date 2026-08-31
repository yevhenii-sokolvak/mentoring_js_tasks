import { useEffect, useState } from 'react';
import { CATEGORIES } from '../src/constants/CONSTANTS';

function NoteForm({ onAddNote, onUpdateNote, noteToEdit, onCancelEdit }) {
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newCategory, setNewCategory] = useState('personal');

    useEffect(() => {
        if (noteToEdit) {
            setNewTitle(noteToEdit.title);
            setNewContent(noteToEdit.content);
            setNewCategory(noteToEdit.category);
        } else {
            setNewTitle('');
            setNewContent('');
            setNewCategory('CATEGORIES[0]');
        }
    }, [noteToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newTitle.trim()) return;

        if (noteToEdit) {
            onUpdateNote({
                ...noteToEdit,
                title: newTitle,
                content: newContent,
                category: newCategory,
                createdAt: noteToEdit.createdAt,
            });
        } else {
            onAddNote({
                id: crypto.randomUUID(),
                title: newTitle,
                content: newContent,
                category: newCategory,
                createdAt: new Date().toISOString(),
            });
        }

        setNewTitle('');
        setNewContent('');
        setNewCategory('personal');
    };

    return (
        <div className="mb-4">
            <div className="mb-2">
                {noteToEdit ? 'Edit note' : 'Add new note'}
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 border border-gray-300 p-4 rounded"
            >
                <input
                    type="text"
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Enter note name..."
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />

                <textarea
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Enter note content..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                />

                <select
                    className="border border-gray-300 p-2 rounded"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                >
                    {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
                    >
                        {noteToEdit ? 'Save' : 'Add Note'}
                    </button>

                    {noteToEdit && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 cursor-pointer"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default NoteForm;