import {createSlice} from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: [],
    counter: [],
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

      //// update counter
      if (
        ('10k9jl8tJfctGzd7IjrNcSCvRAJ2' === action.payload.channel ||
          'ITC' === action.payload.channel) &&
        action.payload.publisher !== '10k9jl8tJfctGzd7IjrNcSCvRAJ2'
      ) {
        if (
          state.counter.some(
            item =>
              item.id === action.payload.publisher ||
              (item.id === 'ITC' && action.payload.channel === 'ITC'),
          )
        ) {
          state.counter = state.counter.map(item => {
            if (
              (item.id === action.payload.publisher && item.available) ||
              (item.id === 'ITC' &&
                action.payload.channel === 'ITC' &&
                item.available)
            ) {
              return {
                ...item,
                count: item.count + 1,
                available: true,
              };
            }
            return item;
          });
        } else {
          if (action.payload.channel === 'ITC') {
            state.counter.push({
              id: action.payload.channel,
              count: 1,
              available: true,
            });
          } else {
            state.counter.push({
              id: action.payload.publisher,
              count: 1,
              available: true,
            });
          }
        }
      }
      console.log('==========================> Counter', state.counter);
    },
    reset: (state, action) => {
      if (state.counter.some(item => item.id === action.payload)) {
        state.counter = state.counter.map(item => {
          if (item.id === action.payload) {
            return {
              ...item,
              count: 0,
              available: false,
            };
          }
          return item;
        });
      } else {
        state.counter.push({
          id: action.payload,
          count: 0,
          available: false,
        });
      }
    },
    freeall: state => {
      state.counter = state.counter.map(item => {
        return {
          ...item,
          available: true,
        };
      });
    },
  },
});

export const {update, reset, freeall} = messageSlice.actions;

export default messageSlice.reducer;
