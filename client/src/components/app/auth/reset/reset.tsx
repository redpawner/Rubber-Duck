import '../login/login.scss';
import logo from '../../../../Images/logo.png';
import { buttonsLogicStore } from '../../../../state-stores/state-stores';
import { resetPassword } from '../../../../api-services/api-auth';
import { useState } from 'react';

function Reset() {
  const loginShow = buttonsLogicStore((state) => state.setLogin);
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
        <div className="sign-buttons-cont" id="reset">
          <h4 id="sign-button" className="sign-in-button">
            Reset password
          </h4>
        </div>
        <div className="login-container">
          <form onSubmit={resetPass}>
            <label htmlFor="email" className="reg-input">
              Email:{' '}
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="login-textBox"
              required
            />
            {message}
            <button className="reset-btn">Reset Your Password</button>
          </form>
          <button id="sign-button" className="reset-btn" onClick={loginShow}>
            Return to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reset;
