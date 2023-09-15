// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';

export const getFirebaseApp = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyBmr87E2RzvhNAG7JLPb_5Km4WEmVA7gY0',
    authDomain: 'hihello-a8e23.firebaseapp.com',
    projectId: 'hihello-a8e23',
    storageBucket: 'hihello-a8e23.appspot.com',
    messagingSenderId: '1000605987736',
    appId: '1:1000605987736:web:afddda04743b6aee8f71ed',
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
