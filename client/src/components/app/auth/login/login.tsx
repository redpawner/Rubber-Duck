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
import { googleLogin } from '../../../../api-services/api-auth';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../../../graphql/queries-mutations';

function Login() {
  window.history.replaceState(null, '', '/');
  const registerShow = buttonsLogicStore((state) => state.setReg);
  const forgotPassword = buttonsLogicStore((state) => state.setReset);
  const setUserUid = userStore((state) => state.setUserUid);
  const setUserToken = userStore((state) => state.setUserToken);
  const [createUser] = useMutation(CREATE_USER);
  //this event typescript type should be interfaced somewhere (any is bad)
  //component id's need changing to classNames (and maybe named better) => check console logs to see what I mean

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email: string = event.target.email.value;
    const password: string = event.target.password.value;
    const user = await loginUser(email, password);
    setUserUid(user.uid);
    setUserToken(user.accessToken);
  };

  const googleSignIn = async () => {
    const user = await googleLogin();
    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      setUserUid(user.uid);
      await createUser({
        variables: {
          record: {
            avatar: 'user.59168e41eade7de7457f.png',
            username: user.displayName,
            email: user.email,
            uid: user.uid,
          },
        },
      });
      setUserToken(user.accessToken);
    } else {
      setUserUid(user.uid);
      setUserToken(user.accessToken);
    }
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
          <label className="reg-input" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            className="reg-textBox"
            name="email"
            id="email"
            autoComplete="email"
            required
          />
          <label className="reg-input" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            className="reg-textBox"
            name="password"
            id="password"
            autoComplete="new-password"
            required
          />
          <button className="login-btn">Log In</button>
          <div>
            <a className="forgot-password" onClick={forgotPassword}>
              Forgot Password ?
            </a>
          </div>
        </form>
      </div>
      <h1 className="divider-login">
        <hr />
      </h1>
      <div className="login-other-platforms">
        <button id="platform-button">
          <img
            id="socialmedia-img"
            src={google}
            alt="facebook"
            onClick={googleSignIn}
          ></img>
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
