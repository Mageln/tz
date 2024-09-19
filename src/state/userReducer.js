"use client"

import { useEffect } from "react";

const initialState = {
    user:{
        username: "",
        email:  "",
        avatars: "",
    },
    records: [],
};


 const userReducer = (state=initialState,action) => {

    switch(action.type){
        
        case "REGISTER_USER":
            const newState = {...state, username: action.username, email:action.email};
            sessionStorage.getItem("username", action.username)
            sessionStorage.getItem("email", action.email)
        return newState;

        case "UPDATE_USER_AVATAR":
            return { ...state, user: { ...state.user, avatar: action.avatar } };
        default:
            return state
    }
}


export default userReducer

     
