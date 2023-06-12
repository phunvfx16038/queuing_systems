export type deviceProp = {
    code:string
    name:string
    ip_address:string|number
    type:string
    login_name:string
    password:string
    using_service:string[]
    connect?:Boolean
    active?:Boolean
}