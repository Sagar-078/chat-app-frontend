// import { createSlice } from "@reduxjs/toolkit";

// const intialState = {
//     selectedUser: localStorage.getItem("selectedUser") ? JSON.parse(localStorage.getItem("selectedUser")) : null,
//     loading: false,
// };

// const chatSlice = createSlice({
//     name: "selectedUser",
//     initialState: intialState,
//     reducers: {
//         setSelectedUser(state, value){
//             state.selectedUser = value.payload;
//             localStorage.setItem("selectedUser", JSON.stringify(value.payload));
//         },
//         setLoading(state, value){
//             state.loading = value.payload;
//         },
//     },
// });

// export const {setSelectedUser, setLoading} = chatSlice.actions;
// export default chatSlice.reducer;