import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const createUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // remove at production
      console.log('user registered');
    })
    .catch((error) => {
      console.log(error);
    });
};

const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // remove at production
      console.log('user logged in');
    })
    .catch((error) => {
      console.log(error);
    });
};

const logoutUser = () => {
  signOut(auth)
    .then(() => {
      //remove at production
      console.log('sign-out success');
    })
    .catch((error) => {
      console.log(error);
    });
};

export { createUser, loginUser, logoutUser };
