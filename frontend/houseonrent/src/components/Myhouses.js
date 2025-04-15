import React,{useContext,useState, useEffect, useRef} from 'react'
import Housecontext from '../contexts/Housecontext';
import House from './House';
import axios from 'axios'

const Myhouses = () => {
    const context=useContext(Housecontext)
    const {myhouses,getmyhouses}=context;
    const [house, sethouse] = useState({rent:'',address:'',url:''})
  const [image, setimage] = useState({})
  const ref=useRef(null)
  const refClose=useRef(null)
    useEffect(()=>{
        getmyhouses();
    },[myhouses])
    

  const onchange=(e)=>{
    sethouse({...house,[e.target.name]:e.target.value})
  }
  const handleImage=async(e)=>{
    setimage(e.target.files[0])
    // sethouse({...house,['url']:e.target.files[0].name})
    sethouse({...house,[e.target.name]:e.target.files[0].name})
  }
  const handlesubmit=(e)=>{
    e.preventDefault()
    let formdata=new FormData()
    formdata.append('image',image)
    axios.post('http://localhost:3001/houses/uploadimage',formdata,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })

    axios.post('http://localhost:3001/houses/createhouse',house,{
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
    })
    refClose.current.click()
  }
  return (
    <>
    <div className='d-flex'>
    {myhouses.map(house=>{
        return <House key={house.id} rent={house.rent} address={house.address} url={house.url}/>
    })}
    </div>
    <img className='add' src='add.png' alt='add-house' width={50} height={50} onClick={()=>{ref.current.click()}} />
    {/* <!-- Button trigger modal --> */}
<button type="button" className="d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      <form>
  <div className="mb-3">
    <label htmlFor="rent" className="form-label">Rent</label>
    <input type="text" className="form-control" id="rent" aria-describedby="emailHelp" name='rent' aria-required='true' onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="address" className="form-label">Address</label>
    <input type="text" className="form-control" id="address" name='address' onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="address" className="form-label">House Image</label>
    <input type="file" className="form-control" id="image" name='url' onChange={handleImage}/>
  </div>
</form>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
        <button type="button" className="btn btn-primary" onClick={handlesubmit}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Myhouses