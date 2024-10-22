import React from 'react'
import { URL } from '../utils/constants'
import { Note } from '../types'


export const useHandleSubmit = (
  notes: Note[], 
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>, 
  title: string, 
  content: string, 
  setTitle: React.Dispatch<React.SetStateAction<string>>, 
  setContent: React.Dispatch<React.SetStateAction<string>>) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try{
      const createNoteRequest = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content   
        })      
      }) 

      const response = await createNoteRequest.json()
      setNotes([response, ...notes])
    }catch(e){
      console.log(e)
    }

  
    //setNotes([ {id: notes.length + 1, title, content}, ...notes])
    setTitle('')
    setContent('')    
  }
  return {
    handleSubmit
  }
}
