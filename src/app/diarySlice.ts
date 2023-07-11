import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore"
import { app } from "../firebase/firebase"
import { userDiaryType } from "../pages/UserDiary"

export type initProp = {
    diary:userDiaryType[]
    isLoading:boolean,
    isError:undefined|string
}
export const db = getFirestore(app)
export const diaryCollection = collection(db,'diarys')

const initialState:initProp = {
    diary:[],
    isLoading:false,
    isError:undefined
}

const addDiarysToFireBase = async (diary:userDiaryType) =>{
    await addDoc(diaryCollection,{...diary})
}

export const addDiary = createAsyncThunk(
    'diary/addDiary',
    async(diary:userDiaryType)=>{
        try{
            const date = new Date();
            const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            const month =
            date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1;

            const currenDate =
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds() +
            " " +
            day +
            "/" +
            month +
            "/" +
            date.getFullYear();
            const newDiary = {...diary,date:currenDate,ipAddress:'192.168.0.1'}
            const res = await addDiarysToFireBase(newDiary)
           return res
        }catch(err){
            return err
        }
      
    }
)

export const diarySlice = createSlice({
    name:'diary',
    initialState,
    reducers:{
        getDiarys:(state,action)=>{
            state.diary = action.payload
        },
    }
})
export const {getDiarys} = diarySlice.actions
export default diarySlice.reducer