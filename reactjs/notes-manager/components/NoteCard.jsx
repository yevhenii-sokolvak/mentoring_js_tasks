function NoteCard({ note, onDeleteNote, onEditNote }) {
        return(
        <div className="border rounded p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">
                {note.title}
            </h2>

            <p className="mb-2">
                {note.content}
            </p>

            <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                {note.category}
            </span>

            <span className="ml-2 text-gray-500 text-xs">
                Created at: {new Date(note.createdAt).toLocaleString()}
            </span>

            <div className="flex gap-2 mt-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                    onClick={() => onEditNote(note)}
                >
                    Edit
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