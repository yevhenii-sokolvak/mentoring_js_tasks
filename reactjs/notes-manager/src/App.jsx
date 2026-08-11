import NotesManager from '../components/NotesManager'
import Header from '../components/Header'


function App() {

  const notes = [
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
  ]

  return (
    <div className="container mx-auto p-4">
      <Header />
      <NotesManager notes={notes} />
    </div>
  )
}

export default App
