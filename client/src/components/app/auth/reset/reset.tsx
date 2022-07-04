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
            <button className="reset-btn" id="margin-bottom">
              Reset Your Password
            </button>
            <button id="sign-button" className="reset-btn" onClick={loginShow}>
              Return to Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
