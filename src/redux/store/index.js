import {configureStore} from '@reduxjs/toolkit';
import {
  userReducer,
  langReducer,
  messageReducer,
  timerReducer,
} from '../slices';

export default configureStore({
  reducer: {
    langR: langReducer,
    userR: userReducer,
    messR: messageReducer,
    timerR: timerReducer,
  },
});
