import { useEffect, useState } from "react"
import { Note } from "../types/index"
import { URL } from "../utils/constants"

export const useFetchData =  () => {
  const [notes, setNotes] = useState<Note[]>([])
  const fetchData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setNotes(data)
  }
  
  useEffect(()=> {
    try{
      fetchData()
    } catch(error){
      console.log(error)
    }
  },[])
  
  return {
    notes,  
    setNotes
  }
}