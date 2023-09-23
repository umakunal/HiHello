// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';

export const getFirebaseApp = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyBAS0sCLjUro5UDos1QwNJ2-U0Ho940B54',
    authDomain: 'hihello-34dd2.firebaseapp.com',
    databaseURL: 'https://hihello-34dd2-default-rtdb.firebaseio.com',
    projectId: 'hihello-34dd2',
    storageBucket: 'hihello-34dd2.appspot.com',
    messagingSenderId: '243879408423',
    appId: '1:243879408423:web:d21b106c90d1ac5719ef02',
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
