import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { serviceProp } from "../propTypes/serviceType"
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore"
import { app } from "../firebase/firebase"

export type initProp = {
    service:serviceProp[]
    isLoading:boolean,
    isError:undefined|string
}
export const db = getFirestore(app)
export const serviceCollection = collection(db,'services')

const initialState:initProp = {
    service:[],
    isLoading:false,
    isError:undefined
}

type editServiceType={
    id:string
    editData:serviceProp
}

const addServicesToFireBase = async (service:serviceProp) =>{
    await addDoc(serviceCollection,{...service})
}

export const addService = createAsyncThunk(
    'service/addservice',
    async(service:serviceProp)=>{
        try{
            const res = await addServicesToFireBase(service)
           return res
        }catch(err){
            return err
        }
      
    }
)

export const editService = createAsyncThunk(
    'service,editService',
    async(editData:editServiceType)=>{
        try{
            const getService = doc(db,`services/${editData.id}`)
            const res = await setDoc(getService,editData.editData,{merge:true})
            console.log(res)
        }catch(err){
            console.log(err)
        }

    }
)

export const serviceSlice = createSlice({
    name:'service',
    initialState,
    reducers:{
        getServices:(state,action)=>{
            state.service = action.payload
        },
    }
})
export const {getServices} = serviceSlice.actions
export default serviceSlice.reducer