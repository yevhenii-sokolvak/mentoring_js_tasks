import NoteList from './NoteList';
import NoteForm from './NoteForm';

function NotesManager({ notes }) {
    return (
        <div>
            <NoteForm />
            <NoteList notes={notes} />
        </div>
    )
}

export default NotesManager;