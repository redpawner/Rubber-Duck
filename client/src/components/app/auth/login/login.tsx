import {
  buttonsLogicStore,
  userStore,
} from '../../../../state-stores/state-stores';

import './login.scss';
import git from '../../../../Images/git.png';
import google from '../../../../Images/google.png';
import apple from '../../../../Images/apple.png';
import logo from '../../../../Images/logo.png';
import { loginUser } from '../../../../api-services/api-auth';

function Login() {
  window.history.replaceState(null, '', '/');
  const registerShow = buttonsLogicStore((state) => state.setReg);
  const forgotPassword = buttonsLogicStore((state) => state.setReset);
  const setUserUid = userStore((state) => state.setUserUid);
  const setUserToken = userStore((state) => state.setUserToken);

  //this event typescript type should be interfaced somewhere (any is bad)
  //component id's need changing to classNames (and maybe named better) => check console logs to see what I mean

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email: string = event.target.email.value;
    const password: string = event.target.password.value;
    const result = await loginUser(email, password);
    setUserUid(result.uid);
    setUserToken(result.accessToken);
  };

  return (
    <div className="form-container">
      <div className="auth-logo">
        <img className="auth-logo-img" src={logo} alt="duck"></img>
      </div>
      <div className="login-form">
        <div className="sign-buttons-cont">
          <button id="sign-button" className="sign-in-button">
            Sign in
          </button>
          <button
            id="sign-button"
            className="sign-up-button"
            onClick={registerShow}
          >
            Sign up
          </button>
        </div>
        <form className="login-container" onSubmit={handleSubmit}>
          <br></br>
          <label className="login-input">Email:</label>
          <br></br>
          <input
            type="text"
            className="login-textBox"
            name="email"
            placeholder="Email"
            required
          />
          <br></br>
          <label className="login-input">Password:</label>
          <br></br>
          <input
            type="password"
            className="login-textBox"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            required
          />
          <button
            className="login-btn"
            // onClick={}
          >
            Log In
          </button>
          <div>
            <a className="forgot-password" onClick={forgotPassword}>
              Forgot Password ?
            </a>
          </div>
        </form>
      </div>
      <h1 className="divider-login">
        ---------------------------------------- Or
        ----------------------------------------{' '}
      </h1>
      <div className="login-other-platforms">
        <button id="platform-button">
          <img id="socialmedia-img" src={google} alt="facebook"></img>
        </button>
        <button id="platform-button">
          {' '}
          <img id="socialmedia-img" src={apple} alt="apple"></img>
        </button>
        <button id="platform-button">
          <img id="socialmedia-img" src={git} alt="github"></img>
        </button>
      </div>
    </div>
  );
}

export default Login;
