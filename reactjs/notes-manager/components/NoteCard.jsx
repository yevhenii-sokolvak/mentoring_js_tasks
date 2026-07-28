function NoteCard() {
    return(
        <div className="border rounded p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Card Title</h2>
            <p className="mb-2">Card content goes here.</p>
            <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                Card category
            </span>
            <div className="flex gap-2 mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                    Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
                    Remove
                </button>
            </div>
        </div>
    )
}

export default NoteCard;