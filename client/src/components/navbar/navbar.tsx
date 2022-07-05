import './navbar.scss';
import logo from '../../Images/logo.png';
import defaultAvatar from '../../Images/avatars/user.png';
import { logoutUser } from '../../api-services/api-auth';
import { userStore } from '../../state-stores/state-stores';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const avatar = userStore((state) => state.avatar) as string;
  const setUserToken = userStore((state) => state.setUserToken);
  const [profilePic, setProfilePic] = useState(defaultAvatar);

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

  return (
    <div className="navbar">
      <div className="small-logo">
        <Link to="/dashboard">
          <img className="logo-img" src={logo} alt="logo"></img>
        </Link>
      </div>
      <div className="profile-button">
        <img className="profile-icon" src={profilePic} alt="profile"></img>
        <div className="dropdown-content">
          <button className="dropdown-button">
            <Link to="/profile">Profile</Link>
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
