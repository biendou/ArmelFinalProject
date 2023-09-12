import {configureStore} from '@reduxjs/toolkit';
import {userReducer, langReducer} from '../slices';

export default configureStore({
  reducer: {
    langR: langReducer,
    userR: userReducer,
  },
});
