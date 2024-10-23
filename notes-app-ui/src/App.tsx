import {  CSSProperties, useState } from 'react'
import './App.css'
import { Form } from './components/Form';
import { Notes } from './components/Notes';
import { Note } from './types/index'
import { useFetchData } from './hooks/useFetchData'
import { useHandleSubmit } from './hooks/useHandleSubmit';
import { useHandleUpdateNote } from './hooks/useHandleUpdateNote';
import { useHandleDeleteNote } from './hooks/useHandleDeleteNote';
import BeatLoader from "react-spinners/BeatLoader"; 
import {color} from './utils/constants'

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};
function App() {
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ selectedNote, setSelectedNote ] = useState<Note | null>(null)
  const [loading, setLoading] = useState(false);
  const { notes, setNotes } = useFetchData(setLoading)
  const { handleSubmit } = useHandleSubmit(notes, setNotes,title,content,setTitle,setContent, setLoading)
  const handleCancelNote = () => {
    setSelectedNote(null)
    setTitle('')
    setContent('')  
  }

  const { handleUpdateNote } = useHandleUpdateNote(notes,selectedNote, setNotes, title, content,handleCancelNote, setLoading)
  const { handleDeleteNote } = useHandleDeleteNote(notes, setNotes, handleCancelNote, setLoading) 
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
        {loading ? 
        <BeatLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader" 
        /> : 
          <Notes
            notes={notes}
            handleNoteClick={handleNoteClick}
            handleDeleteNote={handleDeleteNote}
          />
        }
        
      </div>
      
  </>
  )
}

export default App
