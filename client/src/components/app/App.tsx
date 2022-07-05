import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';
import Navbar from '../navbar/navbar';
import Login from './auth/login/login';
import Register from './auth/register/register';
import Reset from './auth/reset/reset';
import CreateHelp from './dashboard/create-help-request/create-help-request';
import Dashboard from './dashboard/dashboard';
import Chat from './dashboard/chat-room/chat';
import Profile from './dashboard/profile/profile';
import { userStore } from '../../state-stores/state-stores';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const setUserUid = userStore((state) => state.setUserUid);
  const setUserAT = userStore((state) => state.setUserToken);
  const [showNav, setShowNav] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('running');
      if (user) {
        setUserUid(user.uid);
        user.getIdToken().then((token) => setUserAT(token));
        setShowNav(true);
        navigate('/dashboard');
      }
      if (!user) {
        setShowNav(false);
        navigate('/');
      }
    });
  }, []);

  return (
    <>
      {showNav ? <Navbar /> : null}
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatroom" element={<Chat />} />
          <Route path="/createhelprequest" element={<CreateHelp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
