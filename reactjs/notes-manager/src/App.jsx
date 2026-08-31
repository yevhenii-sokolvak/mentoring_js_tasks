import {useState} from 'react';
import NotesManager from '../components/NotesManager'
import Header from '../components/Header'


function App() {

  const [notes, setNotes] = useState([
    {
      id: crypto.randomUUID(),
      title: 'First Note',
      content: 'This is the content of the first note.',
      category: 'Personal',
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'Second Note',
      content: 'This is the content of the second note.',
      category: 'Work',
      createdAt: new Date().toISOString(),
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  const handleEditNote = (note) => {
    setNoteToEdit(note);
  };

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId));
  }

  const handleUpdateNote = (updatedNote) => {
      setNotes((prevNotes) =>
          prevNotes.map((note) =>
              note.id === updatedNote.id ? updatedNote : note
          )
      );

      setNoteToEdit(null);
  };

  const handleCancelEdit = () => {
      setNoteToEdit(null);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  }

  const handleFilter = (category) => {
    setFilterCategory((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((item) => item !== category);
      }

      return [...prevCategories, category];
    });
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory.length === 0 ||
      filterCategory.includes(note.category);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-4">
      <Header onSearch={handleSearch} onFilter={handleFilter} />
      <NotesManager 
        notes={filteredNotes}
        noteToEdit={noteToEdit}
        onAddNote={handleAddNote} 
        onEditNote={handleEditNote} 
        onDeleteNote={handleDeleteNote} 
        onUpdateNote={handleUpdateNote} 
        onCancelEdit={handleCancelEdit} 
      />
    </div>
  )
}

export default App
