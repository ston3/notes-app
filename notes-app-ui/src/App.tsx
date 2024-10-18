import { useState } from 'react'
import './App.css'

type Note = {
  id: number;
  title: string;
  content: string;
}
function App() {
  const [notes, setNotes] = useState<Note[]>([
    {id: 1, title: 'Note 1', content: 'Note 1 content'},
    {id: 2, title: 'Note 2', content: 'Note 2 content'},
    {id: 3, title: 'Note 3', content: 'Note 3 content'},  
    {id: 4, title: 'Note 4', content: 'Note 4 content'},  
  ])

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setNotes([ {id: notes.length + 1, title, content}, ...notes])
    setTitle('')
    setContent('')    
  }

  const handleNoteClick = (note:Note) => {
      setSelectedNote(note)
      setTitle(note.title)
      setContent(note.content)
  }

  const handleCancelNote = () => {
    setSelectedNote(null)
    setTitle('')
    setContent('')  
  }

  const handleUpdateNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedNote) {
      const updateNote = notes.map(
        item => selectedNote.id === item.id 
          ? {...selectedNote, title, content} 
          : 
          item)

      setNotes(updateNote)
      handleCancelNote()
    }
  }

  const handleDeleteNote = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
    const newNotes = notes.filter(item => item.id !== id)
    setNotes(newNotes)
    handleCancelNote()
  }

  return (
    <div className='app-container'>
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
              <small>12/12/2022</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
