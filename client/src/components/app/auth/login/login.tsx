import { userStore } from '../../../../state-stores/state-stores';
import { Link } from 'react-router-dom';
import defaultPic from '../../../../Images/avatars/duck20.png';
import './login.scss';
import git from '../../../../Images/git.png';
import google from '../../../../Images/google.png';
import apple from '../../../../Images/apple.png';
import logo from '../../../../Images/logo.png';
import {
  loginUser,
  googleLogin,
  githubLogin,
  facebookLogin,
} from '../../../../api-services/api-auth';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../../../graphql/queries-mutations';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function Login() {
  window.history.replaceState(null, '', '/');
  const setUserUid = userStore((state) => state.setUserUid);
  const setUserToken = userStore((state) => state.setUserToken);
  const [createUser] = useMutation(CREATE_USER);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const email: string = event.target.email.value;
      const password: string = event.target.password.value;
      const user = await loginUser(email, password);
      if (!user.email)
        alert('The username or password you entered is incorrect');
      setUserUid(user.uid);
      setUserToken(user.accessToken);
    } catch (error) {
      console.log(error);
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
              avatar: defaultPic,
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

  const facebookSignIn = async () => {
    const user = await facebookLogin();
    try {
      setUserUid(user.uid);
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        await createUser({
          variables: {
            record: {
              avatar: defaultPic,
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

  const githubSignIn = async () => {
    const user = await githubLogin();
    try {
      setUserUid(user.uid);
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        await createUser({
          variables: {
            record: {
              avatar: defaultPic,
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

  const togglePassword = () => {
    setShowPassword(!showPassword);
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
              type={showPassword ? 'text' : 'password'}
              className="reg-textBox"
              name="password"
              id="password"
              autoComplete="new-password"
              required
            ></input>

            {!showPassword && (
              <ViewIcon
                className="eye"
                onClick={togglePassword}
                w={29}
                h={29}
                mt={-10}
              />
            )}
            {showPassword && (
              <ViewOffIcon
                className="eye"
                onClick={togglePassword}
                w={29}
                h={29}
                mt={-10}
              />
            )}
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
            alt="google logo"
            onClick={googleSignIn}
          ></img>
        </button>
        <button id="platform-button">
          {' '}
          <img
            id="socialmedia-img"
            src={apple}
            alt="facebook icon"
            onClick={facebookSignIn}
          ></img>
        </button>
        <button id="platform-button">
          <img
            id="socialmedia-img"
            src={git}
            alt="github logo"
            onClick={githubSignIn}
          ></img>
        </button>
      </div>
    </div>
  );
}

export default Login;
