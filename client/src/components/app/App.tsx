import { useEffect } from "react";
import { buttonsLogicStore } from "../../state-stores/state-stores";
import "./App.scss";
import Navbar from "../navbar/navbar";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import Reset from "./auth/reset/reset";
import CreateHelp from "./dashboard/create-help-request/create-help-request";
import Dashboard from "./dashboard/dashboard";
import { userStore } from "../../state-stores/state-stores";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Profile from "./dashboard/profile/profile";

function App() {
  const setUser = userStore((state) => state.setUser);
  const reset = buttonsLogicStore((state) => state.counter);

  const usAt = userStore((state) => state.userAT);
  const profile = buttonsLogicStore((state) => state.profile);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          console.log(user.uid);
          setUser(user.uid, token);
        });
      } else {
        setUser("", "");
      }
    });
  }, []);

  const help = buttonsLogicStore((state) => state.show);

  function renderSwitch() {
    switch (reset) {
      case 0:
        return <Register />;
      case 1:
        return <Login />;
      case 2:
        return <Reset />;
    }
  }

  function authorize() {
    switch (usAt.length > 0) {
      case true:
        if (!profile) {
          return (
            <>
              <Navbar />
              <div className="container">
                <Profile />
              </div>
            </>
          );
        } else {
          return (
            <>
              <Navbar />
              <div className="container"> {helpReq}</div>
            </>
          );
        }

      case false:
        return <div className="container">{renderSwitch()}</div>;
    }
  }

  const helpReq = !help ? <Dashboard /> : <CreateHelp />;

  return <>{authorize()};</>;
}
export default App;
