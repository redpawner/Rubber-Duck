import React from 'react';
import './navbar.scss';
import profile from '../../Images/profile.png';
import logo from '../../Images/logo.png';
import { logoutUser } from '../../api-services/api-auth';
import { useStore } from '../../state-stores/state-stores';

export default function Navbar() {
  const logout = () => {
    logoutUser();
  };
  const changer = useStore((state) => state.setProfile);

  return (
    <div className="navbar">
      <div className="small-logo">
        <img className="logo-img" src={logo} alt="logo"></img>
      </div>
      <div className="button2">
        <img className="navbar-icon" src={profile} alt="profile"></img>
        <div className="dropdown-content">
          <button className="dropdown-butt" onClick={changer}>
            Profile
          </button>
          <button className="dropdown-butt" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
