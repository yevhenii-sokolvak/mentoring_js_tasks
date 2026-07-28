import NoteList from './NoteList';
import NoteForm from './NoteForm';

function NotesManager() {
    return (
        <div>
            <NoteForm />
            <NoteList />
        </div>
    )
}

export default NotesManager;