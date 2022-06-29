import {
  buttonsLogicStore,
  userStore,
} from "../../../../state-stores/state-stores";
import git from "../../../../Images/git.png";
import google from "../../../../Images/google.png";
import apple from "../../../../Images/apple.png";
import "../login/login.scss";
import "./register.scss";
import logo from "../../../../Images/logo.png";
import { fbCreateUser } from "../../../../api-services/api-auth";
import { useMutation } from "@apollo/client";
import CREATE_USER from "../../../../graphql/queries-mutations";
import Dropdown from "../../../dropdown/dropdown";

export default function Register() {
  const loginShow = buttonsLogicStore((state) => state.setLogin);
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  //this event typescript type should be interfaced somewhere (any is bad)

  const useHandleSubmit = async (event: any) => {
    event.preventDefault();
    const email: string = event.target.email.value;
    const password: string = event.target.password.value;
    const username: string = event.target.username.value;
    // const languages: [string] = [event.target.languages.value];

    const result = await fbCreateUser(email, password);
    console.log(result.uid);
    console.log(result.accessToken);

    createUser({
      variables: {
        record: {
          username: username,
          email: email,
          uid: result.uid,
        },
      },
    });
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
          <Dropdown />
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
