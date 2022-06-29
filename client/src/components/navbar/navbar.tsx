import React from 'react';
import './navbar.scss';
import avatar1 from '../../Images/avatar1.png';
import logo from '../../Images/logo.png';
import { logoutUser } from '../../api-services/api-auth';
import { buttonsLogicStore, userStore } from '../../state-stores/state-stores';

export default function Navbar() {
  const avatar = userStore((state) => state.avatar);

  const profile = `static/media/${avatar}`;
  console.log(profile);
  console.log(avatar1);

  const logout = () => {
    logoutUser();
  };
  const changer = buttonsLogicStore((state) => state.setProfile);
  // const profiles = () => {};

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
