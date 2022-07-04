import {
  buttonsLogicStore,
  userStore,
} from '../../../../state-stores/state-stores';
import '../login/login.scss';
import './register.scss';
import defaultPic from '../../../../Images/avatars/user.png';
import logo from '../../../../Images/logo.png';
import { fbCreateUser } from '../../../../api-services/api-auth';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../../../graphql/queries-mutations';

function Register() {
  const loginShow = buttonsLogicStore((state) => state.setLogin);
  const setUserUid = userStore((state) => state.setUserUid);
  const setUserToken = userStore((state) => state.setUserToken);

  const [createUser] = useMutation(CREATE_USER);
  //this event typescript type should be interfaced somewhere (any is bad)

  const useHandleSubmit = async (event: any) => {
    event.preventDefault();
    const email: string = event.target.email.value;
    const password: string = event.target.password.value;
    const username: string = event.target.username.value;
    // const languages: [string] = [event.target.languages.value];

    const result = await fbCreateUser(email, password);

    setUserUid(result.uid);

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
  };

  return (
    <div className="form-container">
      <div className="auth-logo">
        <img className="auth-logo-img" src={logo} alt="duck"></img>
      </div>
      <div className="register-form">
        <div className="sign-buttons-cont">
          <button
            id="sign-button"
            className="sign-in-button2"
            onClick={loginShow}
          >
            Sign in
          </button>
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
            type="password"
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
          <input
            type="password"
            id="password1"
            className="reg-textBox"
            name="password1"
            autoComplete="off"
            required
          />
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

export default Register;
