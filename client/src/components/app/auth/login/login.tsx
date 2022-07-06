import { userStore } from '../../../../state-stores/state-stores';
import { Link } from 'react-router-dom';
import './login.scss';
import git from '../../../../Images/git.png';
import google from '../../../../Images/google.png';
import apple from '../../../../Images/apple.png';
import logo from '../../../../Images/logo.png';
import { loginUser, googleLogin } from '../../../../api-services/api-auth';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../../../graphql/queries-mutations';
import {useState} from 'react';

function Login() {
  window.history.replaceState(null, '', '/');
  const setUserUid = userStore((state) => state.setUserUid);
  const setUserToken = userStore((state) => state.setUserToken);
  const [createUser] = useMutation(CREATE_USER);
  const [showPassword,setShowPassword]=useState(false);

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const email: string = event.target.email.value;
      const password: string = event.target.password.value;
      const user = await loginUser(email, password);
      console.log(user);
      setUserUid(user.uid);
      setUserToken(user.accessToken);
    } catch (error) {
      alert('Incorrect Username/Password.Please try again.')
    }
  };

  const googleSignIn = async () => {
    const user = await googleLogin();
    try {
      setUserUid(user.uid);
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
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
      }
      setUserToken(user.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const togglePassword = () =>{
    setShowPassword(!showPassword)
  }

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
          <Link to="/register">
            <button id="sign-button" className="sign-up-button">
              Sign up
            </button>
          </Link>
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
          <div className="password-box">
          <input
            type={showPassword?"text":"password"}
            className="reg-textBox"
            name="password"
            id="password"
            autoComplete="new-password"
            required
          >

          </input>
          {!showPassword &&<button className="eye" onClick={togglePassword}>Show</button>}
          {showPassword &&<button className="eye" onClick={togglePassword}>Hide</button>}
          </div>
          <button className="login-btn">Log In</button>
          <div>
            <Link className="forgot-password" to="/reset">
              Forgot password?
            </Link>
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
