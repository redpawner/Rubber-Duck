import { useStore, userStore } from '../../../../state-stores/state-stores';
import git from '../../../../Images/git.png';
import google from '../../../../Images/google.png';
import apple from '../../../../Images/apple.png';
import '../login/login.scss';
import './register.scss';
import logo from '../../../../Images/logo.png';
import { fbCreateUser } from '../../../../api-services/api-auth';
import { useMutation } from '@apollo/client';
import CREATE_USER from '../../../../graphql/queries-mutations';
import { useCallback } from 'react';

export default function Register() {
  const loginShow = useStore((state) => state.setLogin);
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  //this event typescript type should be interfaced somewhere (any is bad)

  const useHandleSubmit = async (event: any) => {
    event.preventDefault();
    const email: string = event.target.email.value;
    const password: string = event.target.password.value;
    const username: string = event.target.username.value;

    const result = await fbCreateUser(email, password);
    // if (typeof result === 'string') return null;
    console.log(result);
    // const accessToken = await result.getIdToken();
    const uid = result.uid;

    const newUser = {
      username: username,
      email: email,
      uid: uid,
    };

    createUser({
      variables: {
        record: {
          username: newUser.username,
          email: newUser.email,
          uid: newUser.uid,
        },
      },
    });
    // console.log(createUser);
    // console.log(currentUser);

    // const currentUser = useCallback(() => {
    //   useMutation(CREATE_USER, {
    //     variables: {
    //       username: newUser.username,
    //       email: newUser.email,
    //       _id: newUser.uid,
    //     },
    //   });
    // }, []);

    // currentUser();

    // useMutation(CREATE_USER, {
    //   variables: {
    //     username: username,
    //     email: email,
    //     // _id: result.uid,
    //   },
    // });
  };

  return (
    <div className="form-container">
      <div className="auth-logo">
        <img className="auth-logo-img" src={logo} alt="duck"></img>
      </div>
      <div className="register-form">
        <div className="sign-buttons-cont">
          <button id="sign-butt" className="sign-in-butt2" onClick={loginShow}>
            SIGN IN
          </button>
          <button id="sign-butt" className="sign-up-butt2">
            SIGN UP
          </button>
        </div>
        <form className="login-container" onSubmit={useHandleSubmit}>
          <p className="reg-input">Email:</p>
          <input
            type="text"
            className="reg-textBox"
            name="email"
            autoComplete="off"
          />
          <p className="reg-input">Password:</p>
          <input
            type="password"
            className="reg-textBox"
            name="password"
            autoComplete="new-password"
          />
          <p className="reg-input">Confirm Password:</p>
          <input
            type="password"
            className="reg-textBox"
            name="password1"
            autoComplete="off"
          />
          <p className="reg-input">Username:</p>
          <input
            type="text"
            className="reg-textBox"
            name="username"
            autoComplete="off"
          />
          <p className="reg-input">Programming Languages:</p>
          <input
            type="text"
            className="reg-textBox"
            name="languages"
            autoComplete="off"
          />
          <button
            className="login-btn2"
            // onClick={}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
