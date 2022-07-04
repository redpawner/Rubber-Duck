import { useState } from 'react';
import './profile.scss';
import {
  buttonsLogicStore,
  userStore,
} from '../../../../state-stores/state-stores';
import ProgressBar from './progress bar/progress';
import coffee from '../../../../Images/coffee.png';
import Popup from 'reactjs-popup';
import avatars from '../../../../utils/avatarurls';
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR } from '../../../../graphql/queries-mutations';

function Profile() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const setDashboard = buttonsLogicStore((state) => state.setDashboard);
  const avatar = userStore((state) => state.avatar) as string;
  const setAvatar = userStore((state) => state.setAvatar);
  const [profilePic, setProfilePic] = useState(avatar);
  const [updateAvatar] = useMutation(UPDATE_AVATAR);
  const user = userStore((state) => state);

  const updateUserAvatar = async () => {
    try {
      setAvatar(profilePic);
      await updateAvatar({
        variables: {
          record: {
            avatar: profilePic,
          },
          filter: {
            uid: user.uid,
          },
        },
      });
      return 'Success';
    } catch (error) {
      return 'Failed to update';
    }
  };

  const handleSubmit = async (event: any) => {
    const result = await updateUserAvatar();
    console.log(result);
    event.preventDefault();

    setDashboard();
  };

  const testData = [
    // { bgcolor: '#6a1b9a', completed: 60 },
    // { bgcolor: '#00695c', completed: 30 },
    { bgcolor: '#ef6c00', completed: 53 },
  ];

  const avatarsDisplay = avatars.map((el: any) => {
    return (
      <div className="avatars-div">
        <img
          className="avatar-img"
          src={el}
          alt="avatar"
          onClick={() => setProfilePic(() => el)}
        ></img>
      </div>
    );
  });

  return (
    <div className="dashboard-container">
      <div className="profile-div">
        <h1 className="dashboard-title">Profile</h1>
        <div className="avatar-wrap">
          <div className="avatar-div">
            <img className="your-avatar" src={profilePic} alt="avatar"></img>
          </div>

          <button className="set-avatar-btn" onClick={() => setOpen((o) => !o)}>
            Change
          </button>
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="avatars-popup">
              <div className="btn-save-container">{avatarsDisplay}</div>

              <button className="save-buttonx" onClick={closeModal}>
                Save
              </button>
            </div>
          </Popup>

          <div className="dropdown-avatar"></div>
        </div>
      </div>
      {/* onSubmit={useHandleSubmit} */}
      <div className="mid-section">
        <form className="profile-form" onSubmit={handleSubmit}>
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

          <button className="save-profile-button">Return</button>
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
