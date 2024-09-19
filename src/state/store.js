"use client";


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from 'react-hook-form';
import userReducer from './userReducer';
import recordsReducer from './recordsReducer';


const rootReducer = combineReducers({
  user: userReducer,
  records: recordsReducer,
  form: formReducer,
});

 const store = configureStore({
  reducer: rootReducer,
});

export default store