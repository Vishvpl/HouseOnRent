import React,{useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate()
  const [credentials, setCredentials] = useState({email:'', password:''})
  const onchane=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
const handleClick=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/users/login',credentials)
    .then(res=>{
        console.log(res.data)
        localStorage.setItem('token',res.data)
        navigate('/')
    }).catch(err=>{
       return(<div>some error occured</div>)
    })
}

  return (
    <>
    <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchane} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={onchane}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>

<div className='m-3'>Don't have an account? <Link to='/signup'>Sign Up</Link> </div>
    </>
  )
}

export default Login