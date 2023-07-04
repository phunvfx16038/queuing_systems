import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app, auth } from "../firebase/firebase";
import { userType } from "../dataTypes/userType";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import axios from "axios";

export type initProp = {
    user:userType[]
    login:userType
    isLoading:boolean,
    isError:undefined|string
}

type dataLoginType = {
    email:string,
    password:string
}

type editUseType = {
    user:userType,
    id:string
}

export const db = getFirestore(app)
export const userCollection = collection(db,'users')

const login = (data:dataLoginType) =>{
   return signInWithEmailAndPassword(auth,data.email,data.password)
}

const baseUrl = 'http://localhost:8080'
export const loginUser = createAsyncThunk<userType,dataLoginType,{ rejectValue: string }>(
    'user/loginUser',
    async(data:dataLoginType,thunkApi)=>{
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
        try{
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
            await setDoc(doc(db,'users', res.user.uid),{
                ...data
            })
        }catch(err){
            console.log(err)
        }
    }
)

export const updateOtherUser = createAsyncThunk(
    'user/updateOtherUser',
    async(data:editUseType)=>{
        const getRole = doc(db,`users/${data.id}`)
        const updateToCloudFireStore = await setDoc(getRole,data.user,{merge:true})
        const headers = {
            // token: data.token,
        };
        const {email,password} = data.user
        const EmailandPAsswordUserData = {email,password}
          const res = await axios.post(
            `${baseUrl}/user/update/${data.id}`,
            EmailandPAsswordUserData,
            { headers }
          );
          return res.data;
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
