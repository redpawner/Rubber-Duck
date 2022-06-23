import React from "react";
import "./navbar.css"

export default function Navbar () {
  return (
    <div className="navbar">
     <div className="small-logo">
      <img className="logo-img" src="https://i.etsystatic.com/27152142/r/il/3b2ff8/2976063442/il_1140xN.2976063442_bsoe.jpg" alt="logo"></img>
      </div>
      <div className="buttons-container">
       <button className="logout">logout</button>
      <button className="button2">Another button</button> 
      </div>
    </div> 

    
  )
}