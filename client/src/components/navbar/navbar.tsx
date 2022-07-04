import './navbar.scss';
import logo from '../../Images/logo.png';
import defaultAvatar from '../../Images/avatars/user.png';
import { logoutUser } from '../../api-services/api-auth';
import { buttonsLogicStore, userStore } from '../../state-stores/state-stores';
import { useEffect, useState } from 'react';

function Navbar() {
  const avatar = userStore((state) => state.avatar) as string;
  const setUserToken = userStore((state) => state.setUserToken);
  const [profilePic, setProfilePic] = useState(defaultAvatar);
  const returnDashboard = buttonsLogicStore((state) => state.setDashboard);

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      setProfilePic(avatar);
    }
  }, [avatar]);

  const logout = () => {
    window.history.replaceState(null, '', '/');
    logoutUser();
    setUserToken('');
  };
  const changer = buttonsLogicStore((state) => state.setProfile);
  // const profiles = () => {};

  const onHandleClick = () => {
    changer();

    window.history.replaceState(null, '', '/profile');
  };

  return (
    <div className="navbar">
      <div className="small-logo">
        <img
          className="logo-img"
          src={logo}
          alt="logo"
          onClick={returnDashboard}
        ></img>
      </div>
      <div className="profile-button">
        <img className="profile-icon" src={profilePic} alt="profile"></img>
        <div className="dropdown-content">
          <button className="dropdown-button" onClick={onHandleClick}>
            Profile
          </button>
          <button className="dropdown-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
