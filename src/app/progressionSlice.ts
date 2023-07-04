import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore"
import { app } from "../firebase/firebase"
import { ProgressionType } from "../propTypes/progressionType"

export type initProp = {
    progression:ProgressionType[]
    isLoading:boolean,
    isError:undefined|string
}
export const db = getFirestore(app)
export const progressionCollection = collection(db,'progressions')

const initialState:initProp = {
    progression:[],
    isLoading:false,
    isError:undefined
}

const addprogressionsToFireBase = async (progression:ProgressionType) =>{
    await addDoc(progressionCollection,{...progression})
}

export const addProgression = createAsyncThunk(
    'progression/addProgression',
    async(progression:ProgressionType)=>{
        try{
            const res = await addprogressionsToFireBase(progression)
           return res
        }catch(err){
            return err
        }
      
    }
)

export const progressionSlice = createSlice({
    name:'progression',
    initialState,
    reducers:{
        getProgressions:(state,action)=>{
            state.progression = action.payload
        },
    }
})
export const {getProgressions} = progressionSlice.actions
export default progressionSlice.reducer