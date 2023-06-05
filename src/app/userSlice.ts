import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { userType } from "../dataTypes/userType";

export type initProp = {
    user:userType
    isLoading:boolean,
    isError:undefined|string
}

type dataLoginProp = {
    email:string,
    password:string
}

const login = (data:dataLoginProp) =>{
   return signInWithEmailAndPassword(auth,data.email,data.password)
}

export const loginUser = createAsyncThunk<userType,dataLoginProp,{ rejectValue: string }>(
    'login/loginUser',
    async(data:dataLoginProp,thunkApi)=>{
        try{
            let userData:userType = {
                uid:'',
                displayName:'',
                email:'',
                phoneNumber:'',
                photoUrl:'',
            }
            const res = await login(data)
            res.user.providerData.forEach((profile) => {
                return userData = {
                    ...userData,
                    uid: profile.uid,
                    displayName: profile.displayName,
                    email: profile.email,
                    phoneNumber: profile.phoneNumber,
                    photoUrl: profile.photoURL,
                }
            });
            console.log(userData) 
           return userData
        }catch(err){
            return thunkApi.rejectWithValue("Sai mật khẩu hoặc tên đăng nhập!")
        }
      
    }
)

const initialState:initProp = {
    user:{
        uid:'',
        displayName:'',
        email:'',
        phoneNumber:'',
        photoUrl:'',
    },
    isLoading:false,
    isError:undefined
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(loginUser.pending,(state,action)=>{
                state.isLoading = true
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = action.payload
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.user = action.payload
                state.isLoading = false
                state.isError = undefined
            })
    }
})

export default userSlice.reducer
