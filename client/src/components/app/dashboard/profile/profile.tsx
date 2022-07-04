import React from 'react';
import './profile.scss';
import { buttonsLogicStore } from '../../../../state-stores/state-stores';
import ProgressBar from './progress bar/progress';
import coffee from '../../../../Images/coffee.png';
function Profile() {
  const help = buttonsLogicStore((state) => state.setDashboard);

  const onHandleClick = () => {
    window.history.replaceState(null, '', '/');

    help();
  };

  const testData = [
    // { bgcolor: '#6a1b9a', completed: 60 },
    // { bgcolor: '#00695c', completed: 30 },
    { bgcolor: '#ef6c00', completed: 53 },
  ];

  return (
    <div className="dashboard-container">
      <div className="profile-div">
        <h1 className="dashboard-title">Profile</h1>
        <div className="avatar-wrap">
          <div className="avatar-div">
            <img
              className="your-avatar"
              src="https://yt3.ggpht.com/ytc/AKedOLSqwulPkzzEYz2Y2FveRXgtfNB0-KN4NXN29vbb=s88-c-k-c0x00ffffff-no-rj"
              alt="avatar"
            ></img>
          </div>

          <button className="set-avatar-btn">Change</button>
          <div className="dropdown-avatar"></div>
        </div>
      </div>
      {/* onSubmit={useHandleSubmit} */}
      <div className="mid-section">
        <form className="profile-form">
          <br></br>
          <label className="profile-label">Username:</label>
          <br></br>
          <p className="fixed">Username</p>
          <br></br>
          <label className="profile-label">Email:</label>
          <br></br>
          <p className="fixed">Email</p>
          <br></br>
          <label className="profile-label">Password:</label>
          <br></br>
          <a className="password-reset-a">Reset your password</a>
          <br></br>
          <label className="profile-label" htmlFor="username">
            Location:
          </label>
          <br></br>
          <input type="text" className="profile-textBox" name="location" />
          <br></br>
          <label className="profile-label" htmlFor="username">
            Occupation:
          </label>
          <br></br>
          <input type="text" className="profile-textBox" name="occupation" />
          <br></br>
          <label className="profile-label" htmlFor="username">
            Website:
          </label>
          <br></br>
          <input type="text" className="profile-textBox" name="site" />

          <button className="save-profile-button" onClick={onHandleClick}>
            Save
          </button>
        </form>
        <div className="rating-div">
          <h1 className="progress-title">Score:</h1>
          {testData.map((item, idx) => (
            <ProgressBar
              key={idx}
              bgcolor={item.bgcolor}
              completed={item.completed}
            />
          ))}
          <br></br>
          <label className="profile-label">Times helped:</label>
          <br></br>
          <h1 className="helps-count">25</h1>
          <br></br>
          <label className="profile-label">Asked for help:</label>
          <br></br>
          <h1 className="helps-count">4</h1>

          <div className="coffeediv">
            <img src={coffee} className="coffee" alt="coffee"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
