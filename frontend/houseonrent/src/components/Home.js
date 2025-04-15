import React,{useContext, useEffect} from 'react'
import Housecontext from '../contexts/Housecontext'
import House from './House';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const context=useContext(Housecontext)
    const {houses,gethouses,filterhouses}=context;
    const navigate=useNavigate()
    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(!token) navigate('/login')
        gethouses();
    },[])
  return (
    <>
    <div className='d-flex'>
    {filterhouses.length!==0?filterhouses.map(house=>{return <House key={house.id} rent={house.rent} address={house.address} url={house.url}/> }):
    houses.map(house=>{
        return <House key={house.id} rent={house.rent} address={house.address} url={house.url}/>
    })}
    </div>
    </>
  )
}

export default Home