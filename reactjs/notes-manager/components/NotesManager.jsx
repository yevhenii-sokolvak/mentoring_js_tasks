import NoteList from './NoteList';
import NoteForm from './NoteForm';

function NotesManager({ notes, onAddNote }) {
    return (
        <div>
            <NoteForm onAddNote={onAddNote} />
            <NoteList notes={notes} />
        </div>
    )
}

export default NotesManager;