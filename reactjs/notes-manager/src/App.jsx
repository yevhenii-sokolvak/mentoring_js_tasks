import {useState} from 'react';
import NotesManager from '../components/NotesManager'
import Header from '../components/Header'


function App() {

  const [notes, setNotes] = useState([
    {
      id: crypto.randomUUID(),
      title: 'First Note',
      content: 'This is the content of the first note.',
      category: 'Category 1',
    },
    {
      id: crypto.randomUUID(),
      title: 'Second Note',
      content: 'This is the content of the second note.',
      category: 'Category 2',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId));
  }

  const handleEditNote = (noteId, updatedNote) => {
    setNotes((prevNotes) => prevNotes.map(note => note.id === noteId ? updatedNote : note));
  }

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Header onSearch={handleSearch} />
      <NotesManager notes={filteredNotes} onAddNote={handleAddNote} onDeleteNote={handleDeleteNote} onEditNote={handleEditNote} />
    </div>
  )
}

export default App
