import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    signUpData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState: intialState,
    reducers: {
        setToken(state, action){
            state.token = action.payload;
        },

        setSignUpData(state, action){
            state.signUpData = action.payload;
        },

        setLoading(state, action){
            state.loading = action.payload;
        }
    }
});

export const {setToken, setSignUpData, setLoading} = authSlice.actions;
export default authSlice.reducer;