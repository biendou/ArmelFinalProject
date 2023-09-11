import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userID: '',
  },

  reducers: {
    setUserID: (state, action) => {
      // console.log('hi', action.payload);
      state.userID = action.payload;
    },
    resetUserID: state => {
      state.userID = '';
    },
  },
});

export const {setUserID, resetUserID} = userSlice.actions;

export default userSlice.reducer;
