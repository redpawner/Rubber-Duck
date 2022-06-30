import './navbar.scss';
import logo from '../../Images/logo.png';
import { logoutUser } from '../../api-services/api-auth';
import { buttonsLogicStore, userStore } from '../../state-stores/state-stores';

function Navbar() {
  const avatar = userStore((state) => state.avatar);
  const setUserToken = userStore((state) => state.setUserToken);
  // console.log(avatar);
  const profile = `static/media/${avatar}`;

  const logout = () => {
    logoutUser();
    setUserToken('');
  };
  const changer = buttonsLogicStore((state) => state.setProfile);
  // const profiles = () => {};

  return (
    <div className="navbar">
      <div className="small-logo">
        <img className="logo-img" src={logo} alt="logo"></img>
      </div>
      <div className="profile-button">
        <img className="navbar-icon" src={profile} alt="profile"></img>
        <div className="dropdown-content">
          <button className="dropdown-button" onClick={changer}>
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
