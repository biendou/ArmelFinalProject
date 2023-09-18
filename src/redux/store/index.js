import {configureStore} from '@reduxjs/toolkit';
import {userReducer, langReducer, messageReducer} from '../slices';

export default configureStore({
  reducer: {
    langR: langReducer,
    userR: userReducer,
    messR: messageReducer,
  },
});
