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

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  return (
    <div className="container mx-auto p-4">
      <Header />
      <NotesManager notes={notes} onAddNote={handleAddNote} />
    </div>
  )
}

export default App
