import React,{useContext,useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Housecontext from '../contexts/Housecontext'

const Navbar = () => {
  const context=useContext(Housecontext)
  const navigate=useNavigate()
  const {getfilterhouses}=context;
  const [price, setprice] = useState()
  const [tkn, settkn] = useState(true)
  useEffect(()=>{

    const token=localStorage.getItem('token')
    if (!token) settkn(false)
  },[tkn])
  console.log(tkn)
  const onchange=(e)=>{
    setprice(e.target.value)
  }
  const handlesearch=(e)=>{
    e.preventDefault();
    getfilterhouses(price)
    setprice()
  }
  const logout=(e)=>{
    localStorage.removeItem('token');
    settkn(false)
    navigate('/login')
  }
  return (
    <>
<nav className="navbar bg-primary navbar-expand-lg mb-2" data-bs-theme="light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to='/myhouses' className="nav-link">My Houses</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="filter by price" aria-label="Search" onChange={onchange}/>
        <button className="btn bg-success" type="submit" onClick={handlesearch}>Search</button>
      </form>
        <button className="btn bg-success" style={{'margin':'5px', 'display':tkn?'inline-box':'none'}} type="submit" onClick={logout}>Log Out</button>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar