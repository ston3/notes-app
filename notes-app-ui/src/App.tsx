import {  useState } from 'react'
import './App.css'
import { Form } from './components/Form';
import { Notes } from './components/Notes';
import { Note } from './types/index'
import { useFetchData } from './hooks/useFetchData'
import { useHandleSubmit } from './hooks/useHandleSubmit';
import { useHandleUpdateNote } from './hooks/useHandleUpdateNote';
import { useHandleDeleteNote } from './hooks/useHandleDeleteNote';
function App() {
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ selectedNote, setSelectedNote ] = useState<Note | null>(null)
  const { notes, setNotes } = useFetchData()
  const { handleSubmit } = useHandleSubmit(notes, setNotes,title,content,setTitle,setContent)
  const handleCancelNote = () => {
    setSelectedNote(null)
    setTitle('')
    setContent('')  
  }

  const { handleUpdateNote } = useHandleUpdateNote(notes,selectedNote, setNotes, title, content,handleCancelNote)
  const { handleDeleteNote } = useHandleDeleteNote(notes, setNotes, handleCancelNote) 
  const handleNoteClick = (note:Note) => {
      setSelectedNote(note)
      setTitle(note.title)
      setContent(note.content)
  }

  return (
    <>
      <h1 className='title'>NOTES</h1>
      <div className='app-container'>
        <Form
          selectedNote={selectedNote}
          handleUpdateNote={handleUpdateNote}
          handleSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          handleCancelNote={handleCancelNote}
          />
        <Notes
          notes={notes}
          handleNoteClick={handleNoteClick}
          handleDeleteNote={handleDeleteNote}
          />
      </div>
  </>
  )
}

export default App
