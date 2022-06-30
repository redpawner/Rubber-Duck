import React from 'react';
import './profile.scss';
import { buttonsLogicStore } from '../../../../state-stores/state-stores';

function Profile() {
  const help = buttonsLogicStore((state) => state.setDashboard);

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

      <button className="save-profile-button" onClick={help}>
        SAVE
      </button>
    </div>
  );
}

export default Profile;
