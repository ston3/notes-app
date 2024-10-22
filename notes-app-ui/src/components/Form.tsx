import React from 'react'
import { Note } from '../types'
interface FormProps {
  selectedNote: Note | null
  handleUpdateNote: (e: React.FormEvent<HTMLFormElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  handleCancelNote: () => void
}
export const Form: React.FC<FormProps> = ({
  selectedNote,
  handleUpdateNote,
  handleSubmit,
  title,
  setTitle,
  content,
  setContent,
  handleCancelNote

}) => {
  return (
    <form 
        className="note-form" action=""
        onSubmit={
          selectedNote ?
            (e) => handleUpdateNote(e)
            :
            (e) => handleSubmit(e)
        }
      >
        <input 
          type="text" placeholder='title' required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          name="" id="" rows={10} required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {selectedNote? (
          <div className='edit-buttons'>
            <button type='submit'>Update Note</button>
            <button className='cancel-button' onClick={() => handleCancelNote()}>Cancel</button>
          </div>
        ):
          <button type='submit'>Add Note</button>
        }
      </form>
  )
}
