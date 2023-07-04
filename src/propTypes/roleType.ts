import { CheckboxValueType } from "antd/es/checkbox/Group";
export type roleProp = {
    role_name:string
    description:string
    roleA?:CheckboxValueType[]
    roleB?:CheckboxValueType[]
    userNumber?:number
}