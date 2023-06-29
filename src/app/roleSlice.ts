import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore"
import { app } from "../firebase/firebase"
import { roleProp } from "../propTypes/roleType"

export type initProp = {
    roleManage:roleProp[]
    isLoading:boolean,
    isError:undefined|string
}
export const db = getFirestore(app)
export const roleManageCollection = collection(db,'roleManage')

const initialState:initProp = {
    roleManage:[],
    isLoading:false,
    isError:undefined
}

type editRoleType={
    id:string
    roleManageData:roleProp
}

const addRoleManageToFireBase = async (roleManage:roleProp) =>{
    await addDoc(roleManageCollection,{...roleManage})
}

export const addRoleManage = createAsyncThunk(
    'roleManage/addRoleManage',
    async(roleManage:roleProp)=>{
        try{
            const res = await addRoleManageToFireBase(roleManage)
            console.log(res)
           return res
        }catch(err){
            return err
        }
      
    }
)

export const editRoleManage = createAsyncThunk(
    'roleManage,editRoleManage',
    async(roleManage:editRoleType)=>{
        try{
            const getRole = doc(db,`roleManage/${roleManage.id}`)
            const res = await setDoc(getRole,roleManage.roleManageData,{merge:true})
        }catch(err){
            console.log(err)
        }

    }
)

export const roleSlice = createSlice({
    name:'roleManage',
    initialState,
    reducers:{
        getRoleManage:(state,action)=>{
            state.roleManage = action.payload
        },
    }
})
export const {getRoleManage} = roleSlice.actions
export default roleSlice.reducer