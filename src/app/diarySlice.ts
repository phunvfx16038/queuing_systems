import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore"
import { app } from "../firebase/firebase"
import { diaryType } from "../propTypes/diaryType"


export type initProp = {
    diary:diaryType[]
    isLoading:boolean,
    isError:undefined|string
}
export const db = getFirestore(app)
export const diaryCollection = collection(db,'diary')

const initialState:initProp = {
    diary:[],
    isLoading:false,
    isError:undefined
}

type editdiaryType={
    id:string
    editData:diaryType
}

const addDiarysToFireBase = async (diary:diaryType) =>{
    await addDoc(diaryCollection,{...diary})
}

export const addDiary = createAsyncThunk(
    'diary/addDiary',
    async(diary:diaryType)=>{
        try{
            const res = await addDiarysToFireBase(diary)
           return res
        }catch(err){
            return err
        }
      
    }
)

export const editDiary = createAsyncThunk(
    'diary,editDiary',
    async(editData:editdiaryType)=>{
        try{
            const getDiary = doc(db,`diarys/${editData.id}`)
            const res = await setDoc(getDiary,editData.editData,{merge:true})
        }catch(err){
            console.log(err)
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