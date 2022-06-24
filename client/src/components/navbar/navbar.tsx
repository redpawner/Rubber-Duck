import React from "react";
import "./navbar.scss";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="small-logo">
        <img
          className="logo-img"
          src="https://pm1.narvii.com/6595/994c11d6b41d42e982fbf1789bfcf0a1e8001070_hq.jpg"
          alt="logo"
        ></img>
      </div>
      <div className="buttons-container">
        <button className="logout">Logout</button>
        <button className="button2">Profile</button>
      </div>
    </div>
  );
}
