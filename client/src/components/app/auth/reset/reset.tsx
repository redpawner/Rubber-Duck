import '../login/login.scss';
import logo from '../../../../Images/logo.png';

import { resetPassword } from '../../../../api-services/api-auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Reset() {
  const [message, setMessage] = useState('');

  const resetPass = async (event: any) => {
    event.preventDefault();
    const email: string = event.target.email.value;
    const result = await resetPassword(email);
    setMessage(result);
  };
  return (
    <div className="form-container">
      <div className="auth-logo">
        <img className="auth-logo-img" src={logo} alt="duck"></img>
      </div>
      <div className="login-form">
        <div className="reset-buttons-cont" id="reset">
          <h4 id="sign-button" className="sign-in-button">
            Reset password
          </h4>
        </div>
        <div className="login-container">
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
          <button id="sign-button" className="reset2-btn">
            <Link to="/">Return to Sign In</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reset;
