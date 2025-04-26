import { configureStore } from '@reduxjs/toolkit';
import chickensReducer from './chickensSlice';

const store = configureStore({
  reducer: {
    chickens: chickensReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
