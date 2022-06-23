import React from "react";
import "./navbar.css"

export default function Navbar () {
  return (
    <div className="navbar">
     <div className="small-logo">
      <img className="logo-img" alt="logo"></img>
      </div>
      <div className="buttons-container">
       <button className="logout">logout</button>
      <button className="button2">Another button</button> 
      </div>
    </div> 

   
    
  )
}