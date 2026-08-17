import {useState} from 'react';
import { CATEGORIES } from '../src/constants/CONSTANTS';

function NoteCard({ note, onDeleteNote, onEditNote }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(!isEditing);

        const updatedNote = {
            ...note,
            title: note.title,
            content: note.content,
            category: note.category,
        };
        onEditNote(note.id, updatedNote);
    }

    return(
        <div className="border rounded p-4 mb-4">
            { isEditing ? (
                <div className="mb-2">
                    <input
                        type="text"
                        value={note.title}
                        className="text-lg font-bold mb-2 border border-gray-300 p-1 rounded"
                        onChange={(e) => onEditNote(note.id, { ...note, title: e.target.value })}
                    />
                </div>
            ) : (
                <h2 className="text-lg font-bold mb-2">{note.title}</h2>
            )}

            { isEditing ? (
                <div className="mb-2">
                    <input
                        type="text"
                        value={note.content}
                        className="mb-2 border border-gray-300 p-1 rounded"
                        onChange={(e) => onEditNote(note.id, { ...note, content: e.target.value })}
                    />
                </div>
            ) : (
                <p className="mb-2">{note.content}</p>
            )}

            { isEditing ? (
                <div className="mb-2">
                    <select
                        value={note.category}
                        className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded"
                        onChange={(e) => onEditNote(note.id, { ...note, category: e.target.value })}
                    >
                        {CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                    {note.category}
                </span>
            )}
            <div className="flex gap-2 mt-4">
                <button 
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer ${isEditing ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    onClick={handleEdit}
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer" 
                    onClick={() => onDeleteNote(note.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default NoteCard;