import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlices";
import userReducer from "../Slices/userSlice";
import socketReducer from "../Slices/Socket";
//import chatReducer from "../Slices/chatSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    socket : socketReducer
});

export default rootReducer;