import { useState } from "react";
import Housecontext from "./Housecontext";

const Housestate=({children})=>{
    let inititalstate=[]
    const [houses, sethouses] = useState(inititalstate)
    const [myhouses, setMyhouses] = useState(inititalstate)
    const [filterhouses, setfilterhouses] = useState(inititalstate)

    const gethouses=async()=>{
        const response= await fetch('http://localhost:3001/houses/gethouses')
        const houses= await response.json()
        sethouses(houses);
    }

    const getmyhouses=async()=>{
        const response= await fetch('http://localhost:3001/houses/myhouses',{
            headers:{
                'auth-token':localStorage.getItem('token')
            }
        })
        const houses=await response.json()
        setMyhouses(houses);
    }

    const getfilterhouses=(price)=>{
        if(!price) {
            setfilterhouses(houses)
            return
        }
        const newhouses=houses.filter(house=>{
            return house.rent<=price
        })
        setfilterhouses(newhouses)
    }

    return(
    <Housecontext.Provider value={{houses,gethouses,getmyhouses,myhouses,filterhouses,getfilterhouses}}>{children}</Housecontext.Provider>
    )
}

export default Housestate;