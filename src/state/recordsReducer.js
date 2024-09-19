"use client"
const initialState = []

 const recordReducer = (state=initialState,action) => {

    switch(action.type){
        case "ADD_RECORD":
            return[...state, action.record];
            case "EDIT_RECORD": 
            return state.map((record) => {
                if(record.id === action.record.id){
                    return action.record
                }
                return record
            });
            case "UPDATE_RECORD":
                return action.record
            case "REMOVE_RECORD":
             
                return state.filter((record) => record.id !== action.id)
            default:
                return state
    }
}

export default recordReducer