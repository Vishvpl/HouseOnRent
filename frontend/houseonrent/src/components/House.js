import React from 'react'
import {Link} from 'react-router-dom'

const House = (props) => {
  const url="http://localhost:3001/houseimages/"+props.url;
  return (
    <>
    
    <div className="card m-2" style={{width: "18rem"}}>
  <img src={url} className="card-img-top" alt="house image" height={275} />
  <div className="card-body">
    <h5 className="card-title">{props.rent}/- month</h5>
    <p className="card-text">{props.address}</p>
    <Link to='/schedulevisit' className="btn btn-primary">Schedule A Visit</Link>
  </div>
</div>
    </>
  )
}

export default House