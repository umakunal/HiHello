const {configureStore} = require('@reduxjs/toolkit');
import authSlice from './authSlice';
import chatSlice from './chatSlice';
import messagesSlice from './messagesSlice';
import usersSlice from './userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    chats: chatSlice,
    messages: messagesSlice,
  },
});
