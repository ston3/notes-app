import React from 'react'
import { Note } from '../types/index'
interface NotesProps {
  notes: Note[]
  handleNoteClick: (note: Note) => void
  handleDeleteNote: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void  
}
export const Notes: React.FC<NotesProps> = ({
  notes,
  handleNoteClick,
  handleDeleteNote  
}) => {
  return (
    <div className='notes-grid'>
        {notes.map(note => (
          <div 
            className="note-item" 
            key={note.id}
            onClick={() => handleNoteClick(note)}    
          >
            <div className="note-header">
              <h3>{note.title}</h3>
              <button onClick={ (e) => handleDeleteNote(e, note.id)}>X</button>
            </div>
            <div 
              className="note-body" 
              
            >
              <p>{note.content}</p>
            </div>
          </div>
        ))}
      </div>
  )
}
