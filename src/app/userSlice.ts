import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "../firebase/firebase";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import axios from "axios";
import { userType } from "../propTypes/userType";

export type initProp = {
    user:userType[]
    isLoading:boolean,
    isError:undefined|string
}

type editUseType = {
    user:userType,
    id:string
}

export const db = getFirestore(app)
export const userCollection = collection(db,'users')

const baseUrl = 'http://localhost:8080'

export const createNewUser = createAsyncThunk(
    'user/createNewUser',
    async(data:userType)=>{
        const email = `${data.user_name}@gmail.com`
        try{
            const res = await createUserWithEmailAndPassword(auth, email, data.password)
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
        const {user_name,password} = data.user
        const email = `${user_name}@gmail.com`
        const EmailandPasswordUserData = {email,password}
          const res = await axios.post(
            `${baseUrl}/user/update/${data.id}`,
            EmailandPasswordUserData,
            { headers }
          );
          return res.data;
    }
)

const initialState:initProp = {
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
})
export const {getUsers} = userSlice.actions
export default userSlice.reducer
