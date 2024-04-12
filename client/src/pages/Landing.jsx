import React from 'react'
import "../styles/Landing.css";
import { Link } from 'react-router-dom';
import "../styles/Landing.css"

const Landing = () => {
  return (
    <div className='landing-main'>
      {/* <div className="dark-filter"></div> */}
      <div className="landing-main-content">
    <h1 className='landing-heading'>Welcome to Smile Sync AI</h1>
    <p>Hello and welcome!</p>
    <Link to="/login" className="landing-login-button mx-3">Login</Link>
    <Link to="/register" className="landing-register-button">Register</Link>
    </div>
  
  </div>
  )
}

export default Landing