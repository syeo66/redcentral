import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import firebaseConfig from './firebaseConfig';

export const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);
export const auth = getAuth(firebase);

export const provider = new GoogleAuthProvider();
