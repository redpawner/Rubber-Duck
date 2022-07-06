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
import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '../../graphql/queries-mutations';

function App() {
  const setUserUid = userStore((state) => state.setUserUid);
  const setUserAT = userStore((state) => state.setUserToken);
  const setUser = userStore((state) => state.setUser);
  const uid = userStore((state) => state.uid);
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
        user
          .getIdToken()
          .then((token) => setUserAT(token))
          .catch(() => {
            console.log('error');
            navigate('/');
          });
        setShowNav(true);
        if (
          Array.from(['/', '/register', '/reset']).includes(
            window.location.pathname
          )
        ) {
          navigate('/dashboard');
        }
      } else {
        setShowNav(false);
        navigate('/');
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [getUser] = useLazyQuery(GET_USER, {
    variables: {
      filter: {
        uid: uid,
      },
    },
    fetchPolicy: 'network-only',
  });

  const collectUser = async () => {
    const result = await getUser();
    const user = result.data.userOne;
    setUser(
      user.username,
      user.rating_total,
      user.rating_count,
      user.needHelp,
      user.email,
      user.avatar,
      user.help_request
    );
  };

  useEffect(() => {
    if (uid) {
      collectUser();
    }
  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {showNav ? <Navbar /> : null}
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatroom/:roomID" element={<Chat />} />
          <Route path="/createhelprequest" element={<CreateHelp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
