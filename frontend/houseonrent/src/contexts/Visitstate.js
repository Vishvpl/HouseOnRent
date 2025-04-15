import Visitcontext from "./Visitcontext";
import React,{useState} from 'react'
// import {io} from "socket.io-client"

const Visitstate = ({children}) => {
    const [input, setinput] = useState(' ')
    const [messages, setmessages] = useState([])

    

    const handleMessage =(message) => {
        setmessages((prevMessages) => [...prevMessages, message]);
      }
  return (
    <Visitcontext.Provider value={{handleMessage,messages,input,setinput}}>{children}</Visitcontext.Provider>
  )
}

export default Visitstate