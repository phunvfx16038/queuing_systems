import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { userType } from "../propTypes/userType";
import { loginProp } from "../propTypes/loginType";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, userCollection } from "./userSlice";


export type initProp = {
    login:userType
    isLoading:boolean,
    isError:undefined|string
    isLogin:boolean
}

export const loginUser = createAsyncThunk<userType,loginProp,{ rejectValue: string }>(
    'user/loginUser',
    async(data:loginProp,thunkApi)=>{
        try{
            let userData:userType = {
                displayName:'',
                email:'',
                phone:'',
                photoUrl:'',
                password:'',
                active:true,
                role:'',
                user_name:'',
                accessToken:''
            }
            const email = `${data.userName}@gmail.com`
            const res = await signInWithEmailAndPassword(auth,email,data.password)
            const user = res.user;
            const q = doc(db, "users", user.uid);
            const getData = await getDoc(q);
            const userLogin:any = getData.data()
            userData = {...userLogin}
           return userData
        }catch(err:any){
            console.log(err.code)
            if(err.code === 'auth/user-not-found'){
                return thunkApi.rejectWithValue("Tài khoản chưa được đăng ký!")
            }else{
                return thunkApi.rejectWithValue("Sai mật khẩu hoặc tên đăng nhập!")
            }
        }
    }
)

const initialState:initProp = {
    login:{
        displayName:'',
        email:'',
        phone:'',
        photoUrl:'',
        password:'',
        active:true,
        role:'',
        user_name:'',
        accessToken:''
    },
    isLoading:false,
    isError:undefined,
    isLogin:false
}

export const userSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(loginUser.pending,(state,action)=>{
                state.isLoading = true
                state.isLogin = false
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = action.payload
                state.isLogin = false
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.login = action.payload
                state.isLoading = false
                state.isError = undefined
                state.isLogin = true
            })
    }
})
export default userSlice.reducer
