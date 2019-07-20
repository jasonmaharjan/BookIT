import axios from "axios"
const baseUrl="http://192.168.100.3:3000"

export const login=({username,password})=>{
    return axios.post(baseUrl+"/login",{username,password})
}

export const signup=(signupdata)=>{
    return axios.post(baseUrl+"/signup",signupdata)
}