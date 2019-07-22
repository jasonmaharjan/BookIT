import axios from "axios"
const baseUrl="http://172.17.3.187:3000"

export const login=({username,password})=>{
    return axios.post(baseUrl+"/login",{username,password})
}

export const signup=(signupdata)=>{
    return axios.post(baseUrl+"/signup",signupdata)
}

export const getBooks=()=>{
    return axios.get(baseUrl+"/allbooks")
}

export const searchBooks=(bookName)=>{
    return axios.post(baseUrl+"/books",{search:bookName})
}

export const addBooks=(bookData)=>{
    return axios.post(baseUrl+"/addbook",bookData)
}

export const getUploadBooks=(username)=>{
    return axios.post(baseUrl+"/userbooks",{username})
}

export const removeBook=(bookid)=>{
    return axios.post(baseUrl+"/removebooks",{book_ID:bookid})
}

export const soldBook=(bookdata)=>{
    return axios.post(baseUrl+"/soldbooks",bookdata)
}

export const getSoldBook=(username)=>{
    return axios.post(baseUrl+"/books_sold",{username})
}



