import {createSlice} from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: [],
  },

  reducers: {
    update: (state, action) => {
      console.log(
        'hi',
        ', previous =>',
        state.message,
        ', next =>',
        action.payload,
      );
      state.message.push(action.payload);
      //   state.lang = action.payload;
    },
  },
});

export const {update} = messageSlice.actions;

export default messageSlice.reducer;
