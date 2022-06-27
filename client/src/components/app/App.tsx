
import { useEffect } from "react";
import { useStore } from "../../state-stores/state-stores";
import "./App.scss";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import Reset from "./auth/reset/reset";
import CreateHelp from "./dashboard/create-help-request/create-help-request";
import Dashboard from "./dashboard/dashboard";
import { userStore } from "../../state-stores/state-stores";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";


function App() {
  const setUser = userStore((state) => state.setUser);
  const currentUser = userStore((state) => state);
  const reset = useStore((state) => state.counter);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('running');
      if (user) {
        user.getIdToken().then((token) => {
          setUser(user.uid, token);
          console.log(currentUser);
        });
      } else {

        setUser('', '');
        console.log('no user signed in');

      }
      return unsubscribe;
    });
  }, []);

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

  return (
    <div className="container">
      {renderSwitch()}
      {/* <Dashboard />{" "} */}
    </div>
  );
}
export default App;
