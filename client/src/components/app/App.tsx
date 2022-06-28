import { useEffect } from 'react';
import { useStore } from '../../state-stores/state-stores';
import './App.scss';
import Navbar from '../navbar/navbar';
import Login from './auth/login/login';
import Register from './auth/register/register';
import Reset from './auth/reset/reset';
import CreateHelp from './dashboard/create-help-request/create-help-request';
import Dashboard from './dashboard/dashboard';
import { userStore } from '../../state-stores/state-stores';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

function App() {
  const setUser = userStore((state) => state.setUser);
  const currentUser = userStore((state) => state);
  const reset = useStore((state) => state.counter);
  const userAT = userStore((state) => state.userAT);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          console.log(user.uid);
          setUser(user.uid, token);
        });
      } else {
        setUser('', '');
      }
    });
  }, []);

  const help = useStore((state) => state.show);

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
    switch (userAT.length > 0) {
      case true:
        return (
          <>
            <Navbar />
            <div className="container">{helpReq}</div>
          </>
        );
      case false:
        return <div className="container">{renderSwitch()}</div>;
    }
  }

  const helpReq = !help ? <Dashboard /> : <CreateHelp />;

  return <>{authorize()};</>;
}
export default App;
