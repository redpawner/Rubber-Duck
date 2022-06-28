import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

const fbCreateUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('user registered');
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return error;
    });
};

const loginUser = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
};

const logoutUser = () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

export { fbCreateUser, loginUser, logoutUser };
