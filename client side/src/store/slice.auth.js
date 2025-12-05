import { createSlice } from "@reduxjs/toolkit"

const user = createSlice({
    name: "user",
    initialState: { isLogin : false , user : {}},
    
    reducers : {
        setUser : (state , payload) => {
            state.isLogin = true;
            state.user = payload.payload;
        } ,
        setLogout : (state) => {
            state.isLogin = false;
            state.user = {};
        }
    }
});

export const { setUser , setLogout } = user.actions;
let reducers = user.reducer;
export default reducers;