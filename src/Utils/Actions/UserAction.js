import {child, get, getDatabase, ref} from 'firebase/database';
import {getFirebaseApp} from '../FirebaseHelper';

export const getUserData = async userId => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    console.log('dbRef', dbRef);
    const userRef = child(dbRef, `users/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.val();
  } catch (error) {
    console.log('error occurred while getting user data', error);
  }
};
