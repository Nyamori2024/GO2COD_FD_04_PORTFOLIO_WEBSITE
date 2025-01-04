// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import portfolioReducer from '../features/portfolioSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    portfolio: portfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;