import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

const createUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // remove at production
      console.log('user registered');
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return 'Error creating user: ' + error;
    });
};

const loginUser = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // remove at production
      console.log('user logged in');
      const user = userCredential.user;
      return user;
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
