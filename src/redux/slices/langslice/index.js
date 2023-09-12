import {createSlice} from '@reduxjs/toolkit';

export const langSlice = createSlice({
  name: 'lang',
  initialState: {
    lang: 'en',
  },

  reducers: {
    setLang: (state, action) => {
      console.log(
        'hi',
        ', previous =>',
        state.lang,
        ', next =>',
        action.payload,
      );
      state.lang = action.payload;
      //   state.lang = action.payload;
    },
    setLangToogler: state => {
      console.log('hi', state.lang);
      if (state.lang == 'en') {
        state.lang = 'fr';
      } else {
        state.lang = 'en';
      }
      //   state.lang = action.payload;
    },
    resetLang: state => {
      state.lang = 'en';
    },
  },
});

export const {setLang, resetLang, setLangToogler} = langSlice.actions;

export default langSlice.reducer;
