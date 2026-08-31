import NoteCard from './NoteCard';

function NoteList({ notes, onDeleteNote, onEditNote }) {
    return (
        <div className="border border-gray-300 rounded p-4">
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} onDeleteNote={onDeleteNote} onEditNote={onEditNote} />
            ))}
        </div>
    )
}

export default NoteList;