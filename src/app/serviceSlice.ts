import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { serviceProp } from "../propTypes/serviceType"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { app } from "../firebase/firebase"

export type initProp = {
    service:serviceProp[]
    isLoading:boolean,
    isError:undefined|string
}
export const db = getFirestore(app)
export const deviceCollection = collection(db,'devices')

const initialState:initProp = {
    service:[],
    isLoading:false,
    isError:undefined
}

const addServicesToFireBase = async (service:serviceProp) =>{
    await addDoc(deviceCollection,{...service})
}

export const addService = createAsyncThunk(
    'device/addDevice',
    async(device:serviceProp)=>{
        try{
            const res = await addServicesToFireBase(device)
            console.log(res)
           return res
        }catch(err){
            return err
        }
      
    }
)

export const serviceSlice = createSlice({
    name:'service',
    initialState,
    reducers:{}
})

export default serviceSlice.reducer