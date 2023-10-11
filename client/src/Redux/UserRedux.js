import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({

    name : "user",

    initialState : {
        currentUser : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        isFetching : false,
        error : false
    } ,

    reducers : {

        loginStart : (state) => {
            state.isFetching = true
        },
        loginSuccess : (state , actions) => {
            state.isFetching = false;
            state.currentUser = actions.payload
        },
        loginFailure : (state) => {
            state.isFetching = false
            state.error = true
        },
        logout : (state,action) => {
            state.currentUser = null
        },
        newToken : (state , action) => {
            state.currentUser.accessToken = action.payload
            localStorage.setItem('user', JSON.stringify(state.currentUser))
        }

    }
})

export const {loginStart , loginSuccess , loginFailure , logout, newToken} = userSlice.actions;
export default userSlice.reducer;