const {configureStore} = require('@reduxjs/toolkit');
import authSlice from './authSlice';
import usersSlice from './userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
  },
});
