import { createSlice } from "@reduxjs/toolkit";
import { io } from 'socket.io-client';
const backendUrl ='https://chat-app-backend-s0em.onrender.com';
export const connectSocket = () => {
    try {
     const socket =  io(backendUrl);
     return socket;
    } catch (error) {
        throw new Error("Failed to connect to socket server");
    }
};

const intialState = {
    socket:connectSocket()
}

export const socketSlice = createSlice({
    name: "socket",
    initialState: intialState,
    reducers: {
       
    }
});

export const {} = socketSlice.actions;
export default socketSlice.reducer;