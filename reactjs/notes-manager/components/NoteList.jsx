import NoteCard from './NoteCard';

function NoteList({ notes }) {
    return (
        <div className="border border-gray-300 rounded p-4">
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    )
}

export default NoteList;