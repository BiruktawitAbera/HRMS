
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
};

const rootReducer = (state = initialState, ) => {
  return state;
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
