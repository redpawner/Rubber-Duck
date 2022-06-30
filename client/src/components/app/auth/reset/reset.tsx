import React from "react";
import "../login/login.scss";
import github from "../../../../Images/git.png";
import google from "../../../../Images/google.png";
import apple from "../../../../Images/apple.png";
import logo from "../../../../Images/logo.png";
import { buttonsLogicStore } from "../../../../state-stores/state-stores";

export default function Reset() {
  const registerShow = buttonsLogicStore((state) => state.setReg);

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
        <div className="login-container">
          <input
            type="text"
            className="login-textBox"
            // value={}
            // onChange={}
            placeholder="Email"
            required
          />
          <button
            className="reset-btn"
            // onClick={}
          >
            Reset Your Password
          </button>
        </div>
      </div>
      <p className="divider-login">
        ---------------------------------------- Or
        ----------------------------------------{" "}
      </p>
      <div className="login-other-platforms">
        <button id="platform-button">
          <img id="socialmedia-img" src={google} alt="google"></img>
        </button>
        <button id="platform-button">
          {" "}
          <img id="socialmedia-img" src={apple} alt="apple"></img>
        </button>
        <button id="platform-button">
          <img id="socialmedia-img" src={github} alt="github"></img>
        </button>
      </div>
      //{" "}
    </div>
  );
}
