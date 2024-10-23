import { Note } from "../types"
import { URL } from "../utils/constants"

export const useHandleUpdateNote = (
  notes: Note[],
  selectedNote: Note | null,
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>, 
  title: string, 
  content: string, 
  handleCancelNote: () => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleUpdateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(selectedNote){
      try{
        setLoading(true)
        const updateNoteRequest = await fetch(`${URL}/${selectedNote.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            content   
          })
        })
  
        const newNote = await updateNoteRequest.json() 
        const updateNote = notes.map(
          item => newNote.id === item.id 
            ? {...selectedNote, title, content} 
            : 
            item)
        
        setNotes(updateNote)   
        setLoading(false) 
  
      }catch(e){
        console.log(e)
      }
    }
      /* const updateNote = notes.map(
        item => selectedNote.id === item.id 
          ? {...selectedNote, title, content} 
          : 
          item)

      setNotes(updateNote) */
      handleCancelNote()
    
  }

  
  
  return {handleUpdateNote}
}
