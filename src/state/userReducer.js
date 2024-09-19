"use client"

import { useEffect } from "react";

const initialState = {
    username: "",
    email:  "",
    records: [],
};


 const userReducer = (state=initialState,action) => {
    console.log('User reducer:', state, action);
    switch(action.type){
        
        case "REGISTER_USER":
            const newState = {...state, username: action.username, email:action.email};
            sessionStorage.getItem("username", action.username)
            sessionStorage.getItem("email", action.email)
        return newState;
        default:
            return state
    }
}


export default userReducer

     
