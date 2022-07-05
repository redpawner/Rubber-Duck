import { FormEvent, useState } from 'react';
import './profile.scss';
import { userStore } from '../../../../state-stores/state-stores';
import ProgressBar from './progress bar/progress';
import { useNavigate } from 'react-router-dom';
import coffee from '../../../../Images/buymeacoffe.png';
import Popup from 'reactjs-popup';
import avatars from '../../../../utils/avatarurls';
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR } from '../../../../graphql/queries-mutations';
import { resetPassword } from '../../../../api-services/api-auth';

function Profile() {
  const [open, setOpen] = useState(false);
  const [resets, setResets] = useState(false);
  const closeModal = () => setOpen(false);
  const closeReset = () => setResets(false);
  const avatar = userStore((state) => state.avatar) as string;
  const setAvatar = userStore((state) => state.setAvatar);
  const [profilePic, setProfilePic] = useState(avatar);
  const [updateAvatar] = useMutation(UPDATE_AVATAR);
  const user = userStore((state) => state);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await updateUserAvatar();
    navigate('/dashboard');
  };
  const resetPass = async (event: any) => {
    event.preventDefault();
    const email: string = event.target.email.value;
    const result = await resetPassword(email);
    setMessage(result);
  };
  const testData = [
    // { bgcolor: '#6a1b9a', completed: 60 },
    // { bgcolor: '#00695c', completed: 30 },
    { bgcolor: '#ef6c00', completed: user.rating_count },
  ];

  const avatarsDisplay = avatars.map((el: any, index: number) => {
    return (
      <div className="avatars-div" key={index}>
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
              <div className="icons-wrap">{avatarsDisplay}</div>

              <button className="save-buttonx" onClick={closeModal}>
                Select
              </button>
            </div>
          </Popup>

          <div className="dropdown-avatar"></div>
        </div>
      </div>
      <div className="rating-div">
        <div className="reviews-cont">
          <h1 className="progress-title">Rankings:</h1>
          {testData.map((item, idx) => (
            <ProgressBar
              key={idx}
              bgcolor={item.bgcolor}
              completed={item.completed}
            />
          ))}
          <label className="reviews">52 Reviews</label>
          <br></br>
        </div>
        <div className="coffeediv">
          <img src={coffee} className="coffee" alt="coffee"></img>
        </div>
      </div>
      <div className="mid-section">
        <div className="user-details-div">
          <label className="profile-info-label">User Information</label>
          <form className="profile-form">
            <br></br>
            <label className="profile-label">Username:</label>
            <br></br> <p className="profile-textBox">{user.username}</p>
            <br></br>
            <label className="profile-label">Email:</label>
            <br></br>
            <p className="profile-textBox">{user.email}</p>
            <br></br>
            <label className="profile-label">Password:</label>
            <br></br>
            <a
              className="profile-textBox"
              id="reset-a"
              onClick={() => setResets((o) => !o)}
            >
              Click to reset your password
            </a>
            <br></br>
          </form>
          <Popup open={resets} closeOnDocumentClick>
            <div className="reset-popup">
              <div className="userbox"></div>
              <div className="closex" onClick={closeReset}>
                X
              </div>
              <div className="div-in-a-div">
                <form onSubmit={resetPass} className="reset-form">
                  <label htmlFor="email" className="reg-input">
                    Email:{' '}
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="reset-textBox"
                    required
                  />
                  <p className="message-after">{message}</p>
                  <button className="reset-btn">Reset Your Password</button>
                </form>
              </div>
            </div>
          </Popup>
          <button className="save-profile-button" onClick={handleSubmit}>
            Return
          </button>
        </div>
        <div className="user-details-div">
          <label className="profile-info-label">System Settings</label>
          <form className="profile-form">
            <br></br>
            <label className="profile-label">Language:</label>
            <br></br>
            <p className="profile-textBox">English(United Kingdom)</p>
            <br></br>
            <label className="profile-label">Privacy Settings:</label>
            <br></br>
            <p className="profile-textBox">Public Profile</p>
            <br></br>
            <label className="profile-label">Webpage:</label>
            <br></br>
            <p className="profile-textBox">www.imsocool.con</p>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
