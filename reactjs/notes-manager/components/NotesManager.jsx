import NoteList from './NoteList';
import NoteForm from './NoteForm';

function NotesManager({ notes, noteToEdit, onAddNote, onEditNote, onDeleteNote, onUpdateNote, onCancelEdit }) {
    return (
        <div>
            <NoteForm onAddNote={onAddNote} onUpdateNote={onUpdateNote} noteToEdit={noteToEdit} onCancelEdit={onCancelEdit}/>
            <NoteList notes={notes} onDeleteNote={onDeleteNote} onEditNote={onEditNote} />
        </div>
    )
}

export default NotesManager;