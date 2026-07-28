function NoteForm() {
    return (
        <div className="mb-4">
            Add new note
            <form action="" className="flex flex-col gap-2 border border-gray-300 p-4 rounded">
                <input type="text" className="border border-gray-300 p-2 rounded" id="note-name" placeholder="Enter note name..." required />
                <textarea className="border border-gray-300 p-2 rounded" id="note-content" placeholder="Enter note content..."></textarea>
                <select className="border border-gray-300 p-2 rounded" id="note-category">
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default NoteForm;