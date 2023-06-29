import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app, auth } from "../firebase/firebase";
import { userType } from "../dataTypes/userType";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export type initProp = {
    user:userType[]
    login:userType
    isLoading:boolean,
    isError:undefined|string
}

type dataLoginProp = {
    email:string,
    password:string
}

export const db = getFirestore(app)
export const userCollection = collection(db,'users')

const login = (data:dataLoginProp) =>{
   return signInWithEmailAndPassword(auth,data.email,data.password)
}

export const loginUser = createAsyncThunk<userType,dataLoginProp,{ rejectValue: string }>(
    'user/loginUser',
    async(data:dataLoginProp,thunkApi)=>{
        try{
            let userData:userType = {
                uid:'',
                displayName:'',
                email:'',
                phone:'',
                photoUrl:'',
                password:'',
                active:true,
                role:'',
                user_name:''
            }
            const res = await login(data)
            res.user.providerData.forEach((profile) => {
                // return userData = {
                //     ...userData,
                //     uid: profile.uid,
                //     displayName: profile.displayName,
                //     email: profile.email,
                //     phoneNumber: profile.phoneNumber,
                //     photoUrl: profile.photoURL,
                // }
            });
            console.log(userData) 
           return userData
        }catch(err){
            return thunkApi.rejectWithValue("Sai mật khẩu hoặc tên đăng nhập!")
        }
    }
)

const addUserToFireBase = async (data:userType,id:string)=>{
    const newUser = {...data,id}
    await addDoc(userCollection,{...newUser})
}

export const createNewUser = createAsyncThunk(
    'user/createNewUser',
    async(data:userType)=>{
      const res = createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in
            addUserToFireBase(data,userCredential.user.uid) 
            return userCredential.user
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }
)

const initialState:initProp = {
    login:{
        uid:'',
        displayName:'',
        email:'',
        phone:'',
        photoUrl:'',
        password:'',
        active:true,
        role:'',
        user_name:''
    },
    user:[],
    isLoading:false,
    isError:undefined
}

console.log(auth.currentUser)

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
         getUsers:(state,action)=>{
            state.user = action.payload
        },
    },
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
                state.login = action.payload
                state.isLoading = false
                state.isError = undefined
            })
    }
})
export const {getUsers} = userSlice.actions
export default userSlice.reducer
