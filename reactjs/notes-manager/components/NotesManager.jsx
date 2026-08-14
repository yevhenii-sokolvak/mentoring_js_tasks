import NoteList from './NoteList';
import NoteForm from './NoteForm';

function NotesManager({ notes, onAddNote, onDeleteNote, onEditNote }) {
    return (
        <div>
            <NoteForm onAddNote={onAddNote} />
            <NoteList notes={notes} onDeleteNote={onDeleteNote} onEditNote={onEditNote} />
        </div>
    )
}

export default NotesManager;