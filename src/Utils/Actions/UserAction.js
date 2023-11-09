import {
  child,
  endAt,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
  startAt,
} from 'firebase/database';
import {getFirebaseApp} from '../FirebaseHelper';

export const getUserData = async userId => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const userRef = child(dbRef, `users/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.val();
  } catch (error) {
    console.log('error occurred while getting user data', error);
  }
};

export const searchUser = async queryText => {
  const searchTerm = queryText.toLowerCase();
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const userRef = child(dbRef, 'users');
    const queryRef = query(
      userRef,
      orderByChild('firstLast'),
      startAt(searchTerm),
      endAt(searchTerm + '\uf8ff'), // \uf8ff is used in the query is a high code point in the unicode range
    );
    const snapshot = await get(queryRef);
    if (!snapshot.exists()) {
      return {};
    }
    return snapshot.val();
  } catch (error) {
    console.log('error occurred while searching user', error);
    throw error;
  }
};
