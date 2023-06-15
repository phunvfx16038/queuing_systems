import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { app } from "../firebase/firebase";
import { deviceProp } from "../propTypes/deviceType";
import {addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";

export type initProp = {
    device:deviceProp[]
    isLoading:boolean,
    isError:undefined|string
}

export type EditType={
    id:string,
    editData:deviceProp
}

export const db = getFirestore(app)
export const deviceCollection = collection(db,'devices')

const addDevicesToFireBase = async (device:deviceProp) =>{
    await addDoc(deviceCollection,{...device})
}

export const addDevice = createAsyncThunk(
    'device/addDevice',
    async(device:deviceProp)=>{
        try{
            const res = await addDevicesToFireBase(device)
            console.log(res)
           return res
        }catch(err){
            return err
        }
      
    }
)

export const editDevice = createAsyncThunk(
    'device,editDevice',
    async(editData:EditType)=>{
        try{
            const getDevice = doc(db,`devices/${editData.id}`)
            const res = await setDoc(getDevice,editData.editData,{merge:true})
            console.log(res)
        }catch(err){
            console.log(err)
        }

    }
)

const initialState:initProp = {
    device:[],
    isLoading:false,
    isError:undefined
}

export const deviceSlice = createSlice({
    name:'device',
    initialState,
    reducers:{
        getDevices:(state,action)=>{
            state.device = action.payload
        },
        filterConnect: (state, action) => {
            return{
                ...state,
                device: state.device.filter((device) => 
                      device.connect === (action.payload==='true'))
                }
            }
    },
    extraReducers:(builder)=>{
       
    }
})

export const { getDevices,filterConnect } = deviceSlice.actions;
export default deviceSlice.reducer
