import { useState, FormEvent } from 'react';
import { userStore } from '../../../../state-stores/state-stores';
import '../login/login.scss';
import './register.scss';
import defaultPic from '../../../../Images/avatars/profile.png';
import logo from '../../../../Images/logo.png';
import { fbCreateUser } from '../../../../api-services/api-auth';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../../../graphql/queries-mutations';
import { Link } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function Register() {
  const setUserUid = userStore((state) => state.setUserUid);
  const setUserToken = userStore((state) => state.setUserToken);

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [createUser] = useMutation(CREATE_USER);
  //this event typescript type should be interfaced somewhere (any is bad)

  const useHandleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLElement;
    const email: string = (form.querySelector('#email') as HTMLInputElement)
      ?.value;
    const password: string = (
      form.querySelector('#password') as HTMLInputElement
    )?.value;
    const password1: string = (
      form.querySelector('#password1') as HTMLInputElement
    )?.value;
    const username: string = (
      form.querySelector('#username') as HTMLInputElement
    )?.value;

    if (password !== password1) {
      setError('Passwords do not match!');
      return;
    }
    // const languages: [string] = [event.target.languages.value];

    const result = await fbCreateUser(email, password);

    setUserUid(result.uid);
    console.log(defaultPic);
    try {
      await createUser({
        variables: {
          record: {
            avatar: defaultPic,
            username: username,
            email: email,
            uid: result.uid,
          },
        },
      });
      setUserToken(result.accessToken);
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
      <div className="register-form">
        <div className="sign-buttons-cont">
          <Link to="/">
            <button id="sign-button" className="sign-in-button2">
              Sign in
            </button>
          </Link>
          <button id="sign-button" className="sign-up-button2">
            Sign up
          </button>
        </div>
        <form className="login-container" onSubmit={useHandleSubmit}>
          <br></br>
          <label className="reg-input" htmlFor="email">
            Email:
          </label>
          <br></br>
          <input
            type="text"
            className="reg-textBox"
            name="email"
            id="email"
            autoComplete="email"
            required
          />
          <br></br>
          <label className="reg-input" htmlFor="password">
            Password:
          </label>
          <br></br>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="reg-textBox"
            name="password"
            autoComplete="new-password"
            required
          />

          <br></br>
          <label className="reg-input" htmlFor="password1">
            Confirm Password:
          </label>
          <br></br>
          <div className="password-box1">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password1"
              className="reg-textBox"
              name="confirmPassword"
              autoComplete="off"
              required
            />
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
          <br></br>
          <label className="reg-input" htmlFor="username">
            Username:
          </label>
          <br></br>
          <input
            type="text"
            className="reg-textBox"
            name="username"
            id="username"
            autoComplete="username"
            required
          />
          <button type="submit" className="login-btn2">
            Create Account
          </button>
        </form>
        <div className="err">{error}</div>
      </div>
    </div>
  );
}

export default Register;
