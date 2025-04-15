import React,{useCallback, useEffect, useContext, useRef} from 'react'
import Visitcontext from '../contexts/Visitcontext'
import {io} from "socket.io-client"

// import useSocket from './useSocket'

const Visit = () => {
  const endpoint='http://localhost:3001'
  const context=useContext(Visitcontext)
  const {messages,input,handleMessage,setinput}=context
  const socketref=useRef()
  
    // console.log('soket : ',socket)
    
    console.log('component rendered')
    
    useEffect(()=>{
      socketref.current=io(endpoint)
      console.log('socket : ',socketref.current.current)
      socketref.current.on('recieve',handleMessage)

    

    // Cleanup on unmount
    return () => {
      socketref.current.off("message", handleMessage);
      socketref.current.disconnect()
    };
    },[endpoint])

    const sendmsg=(e)=>{
      console.log('socket : ',socketref)
      e.preventDefault()
      handleMessage(input)
      socketref.current.emit('send',input)
      setinput("");
  }
    // setTimeout(()=>{const listeners=socket.listeners('recieve')
    // console.log('listeners: ',listeners)},5000)
    
  return (
    <>
    <div className='msgcontainer' style={{margin:'auto',height:'70vh', width:'60vw',border:'10px solid black'}}>
        {messages.map((msg,index)=>{
           return <div key={index} className='msg'>{msg}</div>
        })}
    </div>
    <div className='msgcontainer' style={{margin:'5px auto',height:'50px', width:'60vw',border:'10px solid black'}}>
        <input className='visitinput' type='text' name='input' value={input} onChange={useCallback((e)=>{setinput(e.target.value)},[])} placeholder='Enter message' />
    </div>
        <button className='btn btn-outline-success' onClick={sendmsg}>Send</button>
    </>
  )
}

export default Visit