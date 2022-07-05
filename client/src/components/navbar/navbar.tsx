import './navbar.scss';
import logo from '../../Images/logo.png';

import { logoutUser } from '../../api-services/api-auth';
import { userStore } from '../../state-stores/state-stores';

import { Link } from 'react-router-dom';

function Navbar() {
  const avatar = userStore((state) => state.avatar) as string;
  const setUserToken = userStore((state) => state.setUserToken);
  // const [profilePic, setProfilePic] = useState(defaultAvatar);

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
        <img className="profile-icon" src={avatar} alt="profile"></img>
        <div className="dropdown-content">
          <Link to="/profile">
            <button className="dropdown-button">Profile</button>
          </Link>
          <button className="dropdown-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
