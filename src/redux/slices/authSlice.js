import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance  from "./../../config/axiosInstance.js";
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role') || '',
    data : localStorage.getItem('data') || {}
}


export const createAccount = createAsyncThunk("/auth/signup",async (data) =>{
    try {
        const response = await axiosInstance.post("user/register",data);
        toast.promise(response,{
            loading: 'wait! creating your account',
            success: (data) =>{
                return  data?.data?.message;
            },
            error: 'Failed to create your account'
        });

        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{}
})
//https://redux-toolkit.js.org/api/createAsyncThunk


export default authSlice.reducer;