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

import Profile from './dashboard/profile/profile';

function App() {
  const counter = buttonsLogicStore((state) => state.counter);

  const userAT = userStore((state) => state.userAT);

  const help = buttonsLogicStore((state) => state.show);

  function renderSwitch() {
    switch (counter) {
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
      case 'chat':
        return <Chat />;
      case 'dashboard':
        return <Dashboard />;
      case 'help':
        return <CreateHelp />;
      case 'profile':
        return <Profile />;
    }
  }

  function authorize() {
    switch (userAT.length > 0) {
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

  return authorize();
}
export default App;
