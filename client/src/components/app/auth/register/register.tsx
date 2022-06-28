import { useStore, userStore } from "../../../../state-stores/state-stores";
import git from "../../../../Images/git.png";
import google from "../../../../Images/google.png";
import apple from "../../../../Images/apple.png";
import "../login/login.scss";
import "./register.scss";
import logo from "../../../../Images/logo.png";
import { createUser } from "../../../../api-services/api-auth";
import { useMutation } from "@apollo/client";
import CREATE_USER from "../../../../graphql/queries-mutations";

export default function Register() {
  const loginShow = useStore((state) => state.setLogin);

  //this event typescript type should be interfaced somewhere (any is bad)

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email: string = event.target.email.value;
    const password: string = event.target.password.value;
    const username: string = event.target.username.value;


    const result = await createUser(email, password);
    if (typeof result === 'string') return null;
    console.log(await result.getIdToken());
    console.log(result.uid);

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
        <form className="login-container" onSubmit={handleSubmit}>
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
