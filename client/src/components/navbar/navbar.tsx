import './navbar.scss';
import logo from '../../Images/logo.png';
import { logoutUser } from '../../api-services/api-auth';
import { buttonsLogicStore, userStore } from '../../state-stores/state-stores';
import { useEffect, useState } from 'react';

function Navbar() {
  const avatar = userStore((state) => state.avatar);
  const setUserToken = userStore((state) => state.setUserToken);
  const [profilePic, setProfilePic] = useState(
    '/static/media/user.59168e41eade7de7457f.png'
  );

  useEffect(() => {
    setProfilePic(`/static/media/${avatar}`);
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
        <img className="logo-img" src={logo} alt="logo"></img>
      </div>
      <div className="profile-button">
        <img className="navbar-icon" src={profilePic} alt="profile"></img>
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
