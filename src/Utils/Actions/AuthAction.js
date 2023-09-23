import {getFirebaseApp} from '../FirebaseHelper';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {child, getDatabase, ref, set, update} from 'firebase/database';

export const signUp = async (firstName, lastName, email, password) => {
  const app = getFirebaseApp();
  const auth = getAuth(app);
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const {uid} = result.user;
    const userData = await createUser(firstName, lastName, email, uid);
    console.log('User created', userData);
  } catch (error) {
    const errCode = error.code;
    let message = ' Something went wrong';
    if (errCode === 'auth/email-already-in-use') {
      message = 'This email is already in use';
    }
    throw new Error(message);
  }
};
const createUser = async (firstName, lastName, email, userId) => {
  const firstLast = `${firstName} ${lastName}`.toLowerCase();
  const userData = {
    firstName,
    lastName,
    firstLast,
    email,
    userId,
    signUpDate: new Date().toISOString(),
  };
  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${userId}`);
  await set(childRef, userData);
  return userData;
};
export const signIn = (email, password) => {
  console.log('User sign up', email, password);
};
