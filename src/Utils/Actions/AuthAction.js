import {getFirebaseApp} from '../FirebaseHelper';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {child, getDatabase, ref, set, update} from 'firebase/database';
import {authenticate, logout} from '../../Redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserData} from './UserAction';

let timer;
export const signUp = (firstName, lastName, email, password) => {
  return async dispatch => {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const {uid, stsTokenManager} = result.user;
      const {accessToken, expirationTime} = stsTokenManager;
      const expiryDate = new Date(expirationTime);
      const timeNow = new Date();
      const millisecondsUntilExpiry = expiryDate - timeNow;
      const userData = await createUser(firstName, lastName, email, uid);
      dispatch(authenticate({token: accessToken, userData}));
      saveDateToStorage(accessToken, uid, expiryDate);
      timer = setTimeout(() => {
        dispatch(userLogout());
      }, millisecondsUntilExpiry);
    } catch (error) {
      const errCode = error.code;
      let message = ' Something went wrong';
      if (errCode === 'auth/email-already-in-use') {
        message = 'This email is already in use';
      }
      throw new Error(message);
    }
  };
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

const saveDateToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate,
    }),
  );
};
export const signIn = (email, password) => {
  return async dispatch => {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const {uid, stsTokenManager} = result.user;
      const {accessToken, expirationTime} = stsTokenManager;
      const expiryDate = new Date(expirationTime);
      const timeNow = new Date();
      const millisecondsUntilExpiry = expiryDate - timeNow;
      const userData = await getUserData(uid);
      dispatch(authenticate({token: accessToken, userData}));
      saveDateToStorage(accessToken, uid, expiryDate);

      timer = setTimeout(() => {
        dispatch(userLogout());
      }, millisecondsUntilExpiry);
    } catch (error) {
      const errorCode = error.code;
      console.log('error', error);
      console.log('errorCode', errorCode);
      let message = ' Something went wrong';
      if (
        errorCode === 'auth/invalid-login-credentials' ||
        errorCode === 'auth/user-not-found'
      ) {
        message = 'The email or password was incorrect';
      }
      console.log('Error while logging in  user with firebase', message);
      throw new Error(message);
    }
  };
};

export const userLogout = () => {
  return async dispatch => {
    AsyncStorage.clear();
    clearTimeout(timer);
    dispatch(logout());
  };
};

export const updateSignedInUserData = async (userId, newData) => {
  if (newData.firstName && newData.lastName) {
    const firstLast = `${newData.firstName} ${newData.lastName}`.toLowerCase();
    newData.firstLast = firstLast;
  }
  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${userId}`);
  await update(childRef, newData);
};
