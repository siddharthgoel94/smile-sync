import '../styles/navbar.css'
import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const Navbar = () => {

  return (
    <nav class="navbar navbar-expand-lg navbar-light my-navbar">
    <div class="container-fluid">
      <a class="navbar-brand mx-3" href="#">Smile Sync AI</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
          <a class="nav-link active" aria-current="page" href="#">Take Questionnaire</a>
          <a class="nav-link active" aria-current="page" href="#">Find friends</a>
          
          <a class="nav-link active" aria-current="page" href="/logout">Logout</a>
         
          
        </div>
      </div>
      {/* <div>{data.msg}</div> */}
    </div>
  </nav>
  )
}

export default Navbar
