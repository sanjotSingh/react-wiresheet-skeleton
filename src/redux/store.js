// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import wiresheetReducer from './wiresheetSlice';

export const store = configureStore({
  reducer: {
    wiresheet: wiresheetReducer
  }
});
