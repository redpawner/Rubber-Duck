import { useEffect } from 'react';
import { buttonsLogicStore } from '../../state-stores/state-stores';
import './App.scss';
import Navbar from '../navbar/navbar';
import Login from './auth/login/login';
import Register from './auth/register/register';
import Reset from './auth/reset/reset';
import CreateHelp from './dashboard/create-help-request/create-help-request';
import Dashboard from './dashboard/dashboard';
import Chat from './dashboard/chat-room/chat';
import { userStore } from '../../state-stores/state-stores';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import Profile from './dashboard/profile/profile';

function App() {
  const setUserToken = userStore((state) => state.setUserToken);
  const reset = buttonsLogicStore((state) => state.counter);

  const usAt = userStore((state) => state.userAT);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          setUserToken(token);
        });
      } else {
        setUserToken('');
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

  function renderBoards() {
    switch (help) {
      case 0:
        return <Chat />;
      case 1:
        return <Dashboard />;
      case 2:
        return <CreateHelp />;
      case 3:
        return <Profile />;
    }
  }

  function authorize() {
    switch (usAt.length > 0) {
      case true:
        return (
          <>
            <Navbar />
            <div className="container"> {renderBoards()}</div>
          </>
        );

      case false:
        return <div className="container">{renderSwitch()}</div>;
    }
  }

  return <>{authorize()};</>;
}
export default App;
