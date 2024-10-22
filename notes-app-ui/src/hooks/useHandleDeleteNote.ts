import { Note } from "../types"

export const useHandleDeleteNote = (
  notes: Note[],
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  handleCancelNote: () => void
) => {
  const handleDeleteNote = async(e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
    try{
      await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }     
      })
     
      const newNotes = notes.filter(item => item.id !== id)
      setNotes(newNotes)

    }catch(e) {
      console.log(e)
    }

  
    
   /*  const newNotes = notes.filter(item => item.id !== id)
    setNotes(newNotes) */
    handleCancelNote()
  }
  
  
  
  return {
    handleDeleteNote
  }
}
