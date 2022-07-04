import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';

const fbCreateUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return error;
    });
};

const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return error;
    });
};

const googleLogin = async () => {
  const provider = new GoogleAuthProvider().setCustomParameters({});
  return await signInWithPopup(auth, provider)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return error.message;
    });
};

const logoutUser = async () => {
  await signOut(auth).catch((error) => {
    return error;
  });
};

const resetPassword = async (email: string) => {
  const message = await sendPasswordResetEmail(auth, email)
    .then(() => 'Password reset email sent!')
    .catch(() => 'Account does not exist');
  return message;
};

export { fbCreateUser, loginUser, googleLogin, logoutUser, resetPassword };
