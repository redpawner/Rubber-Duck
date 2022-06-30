import React, { useState, useEffect } from 'react';
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
import { GET_USER } from '../../../../graphql/queries-mutations';

export default function Login() {
  const registerShow = buttonsLogicStore((state) => state.setReg);
  const forgotShow = buttonsLogicStore((state) => state.setReset);
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
          <button id="sign-butt" className="sign-in-butt">
            SIGN IN
          </button>
          <button
            id="sign-butt"
            className="sign-up-butt"
            onClick={registerShow}
          >
            SIGN UP
          </button>
        </div>
        <form className="login-container" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-textBox"
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            className="login-textBox"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <button
            className="login-btn"
            // onClick={}
          >
            Log In
          </button>
          <div>
            <a className="forgot-pass" onClick={forgotShow}>
              Forgot Password ?
            </a>
          </div>
        </form>
      </div>
      <p className="divider-login">
        ---------------------------------------- Or
        ----------------------------------------{' '}
      </p>
      <div className="login-other-platforms">
        <button id="platform-butt">
          <img id="socialmedia-img" src={google} alt="facebook"></img>
        </button>
        <button id="platform-butt">
          {' '}
          <img id="socialmedia-img" src={apple} alt="apple"></img>
        </button>
        <button id="platform-butt">
          <img id="socialmedia-img" src={git} alt="github"></img>
        </button>
      </div>
    </div>
  );
}
