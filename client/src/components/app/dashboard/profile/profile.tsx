import React from 'react';
import './profile.scss';
import av1 from '../../../../Images/britney.png';
import av2 from '../../../../Images/avatar1.png';
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
          <div className="dropdown-daddy">
            <button className="set-avatar-btn">Change</button>
            <div className="dropdown-avatar">
              <img className="ava-img" src={av1} alt="av1"></img>
              <img className="ava-img" src={av2} alt="av2"></img>
              <img className="ava-img" alt="av3"></img>
              <img className="ava-img" alt="av4"></img>
              <img className="ava-img" alt="av5"></img>
              <img className="ava-img" alt="av6"></img>
            </div>
          </div>
        </div>
      </div>
      <form className="profile-change-form">
        <label className="profile-username-title" htmlFor="username">
          Username:
        </label>
        <br></br>
        <p className="username-p">User</p>
        <br></br>
        <label className="profile-location" htmlFor="location">
          Location:
        </label>
        <br></br>
        <textarea
          className="profile-field"
          name="description"
          id="description"
          placeholder="Max. 500 characters"
          maxLength={500}
          required
        ></textarea>
        <br></br>
        <label className="help-request-input">Tags:</label>
        <br></br>
        <input
          type="text"
          // onChange={handleChange}
          className="help-title2"
          name="tags"
          placeholder="Javascript"
        />
        <button className="save-profile-button" onClick={help}>
          SAVE
        </button>
      </form>
    </div>
  );
}

export default Profile;
