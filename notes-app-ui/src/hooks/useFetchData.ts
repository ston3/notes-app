import { useEffect, useState } from "react"
import { Note } from "../types/index"
import { URL } from "../utils/constants"

export const useFetchData =  (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [notes, setNotes] = useState<Note[]>([])
  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(URL)
    const data = await response.json()
    setNotes(data)
    setLoading(false)
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