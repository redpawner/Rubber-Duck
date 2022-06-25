import React from "react";

export default function Profile() {
  const formInput = <input type="text" id="login-textBox" />;

  return (
    <div className="reg-container">
      <h1 id="profile-title">PROFILE</h1>
      <ul>
        <li>
          <p id="profile-form">Username:</p>
          {formInput}
        </li>
        <li>
          <p id="profile-form">Bio:</p>
          {formInput}
        </li>
        <li>
          <p id="profile-form">Location:</p>
          {formInput}
        </li>
        <li>
          <p id="profile-form">Programming Languages:</p>
          {formInput}
        </li>
      </ul>
      <button> SAVE </button>
    </div>
  );
}
