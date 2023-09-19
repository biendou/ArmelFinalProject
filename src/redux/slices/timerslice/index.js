import {createSlice} from '@reduxjs/toolkit';

export const timerSlice = createSlice({
  name: 'time',
  initialState: {
    timer: [],
  },

  reducers: {
    update: (state, action) => {
      // console.log('hi', action.payload);
      state.timer = action.payload;
      if (!state.timer.find(element => element.userId === action.payload)) {
        state.timer.push({userId: action.payload, time: Date.now()});
      } else {
        const index = state.timer.findIndex(
          element => element.userId === action.payload,
        );
        state.timer[index].time = Date.now();
      }
    },
  },
});

export const {update} = timerSlice.actions;

export default timerSlice.reducer;
