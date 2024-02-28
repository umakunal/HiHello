import {
  child,
  get,
  getDatabase,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import {getFirebaseApp} from '../FirebaseHelper';

export const createChat = async (loggedInUserId, chatData) => {
  const newChatData = {
    ...chatData,
    createdBy: loggedInUserId,
    updatedBy: loggedInUserId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));
  const newChat = await push(child(dbRef, 'chats'), newChatData);
  const chatUsers = newChatData.users;
  for (let i = 0; i < chatUsers.length; i++) {
    const userId = chatUsers[i];
    await push(child(dbRef, `userChats/${userId}`), newChat.key);
  }
  return newChat.key;
};

export const sendTextMessage = async (chatId, senderId, messageText) => {
  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));
  const messagesRef = child(dbRef, `messages/${chatId}`);
  const messageData = {
    sentBy: senderId,
    sendAt: new Date().toISOString(),
    text: messageText,
  };
  await push(messagesRef, messageData);
  const chatRef = child(dbRef, `chats/${chatId}`);
  await update(chatRef, {
    updatedAt: new Date().toISOString(),
    updatedBy: senderId,
    latestMessage: messageText,
  });
};

export const starMessage = async (messageId, chatId, userId) => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const childRef = child(
      dbRef,
      `userStarredMessages/${userId}/${chatId}/${messageId}`,
    );
    const snapShot = await get(childRef);
    if (snapShot.exists()) {
      // Starred Item Exists.  Un-star
      console.log('Starred Item Exists.  Un-star');
      await remove(childRef);
    } else {
      // Starred Item does not exist.  Star
      console.log('Starred Item does not exist.  Star');
      const starredMessageData = {
        messageId,
        chatId,
        starredAt: new Date().toISOString(),
      };
      await set(childRef, starredMessageData);
    }
  } catch (error) {
    console.log('error occurred while sending message', error);
  }
};
