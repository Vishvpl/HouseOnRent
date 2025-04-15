import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const navigate=useNavigate()
  const [credentials, setcredentials] = useState({name:'',contact:'',email:"",password:''})
  const onchange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleClick=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/users/createuser',credentials)
    .then(res=>{
        localStorage.setItem('token',res.data)
        console.log(res.data)
        navigate('/')
    }).catch(err=>{
        console.log(err)
    })
  }
  return (
    <>
    <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="email" name='name' className="form-control" id="exampleInputEmail1" onChange={onchange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Contact</label>
    <input type="email" name='contact' className="form-control" id="exampleInputEmail1" onChange={onchange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' className="form-control" id="exampleInputEmail1" onChange={onchange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' className="form-control" onChange={onchange} id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
    </>
  )
}

export default Signup