"use client";


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userReducer';
import recordsReducer from './recordsReducer';


const rootReducer = combineReducers({
  user: userReducer,
  records: recordsReducer,

});

 const store = configureStore({
  reducer: rootReducer,
});

export default store