import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB1KPKcN5h-pPrBBKcBatLusACiAwdwH0k',
  authDomain: 'rubber-duck-da611.firebaseapp.com',
  projectId: 'rubber-duck-da611',
  storageBucket: 'rubber-duck-da611.appspot.com',
  messagingSenderId: '755993702919',
  appId: '1:755993702919:web:316f219490796270e9f0a2',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
