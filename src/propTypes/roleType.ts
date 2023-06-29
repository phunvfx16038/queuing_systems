import { CheckboxValueType } from "antd/es/checkbox/Group";
export type roleProp = {
    id?:string
    role_name:string
    description:string
    roleA?:CheckboxValueType[]
    roleB?:CheckboxValueType[]
    user?:{}
    userNumber?:number
}