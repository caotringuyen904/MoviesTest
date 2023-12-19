import axios from 'axios'
import { getValueFromLocalStorage } from '../utils'
import {jwtDecode} from "jwt-decode"

const instance = axios.create({
    baseURL: "http://localhost:3001"
})

const authInstance = axios.create({
    baseURL: "http://localhost:3001"

})


// moi lan di qua req check exp cua token
authInstance.interceptors.request.use((config)=> {
    const token = getValueFromLocalStorage('token')

    //check token expired day
    if(!token){
        location.href= "/auth/login"
        return config
    }   

    try {
        const decodedToken = jwtDecode(token)
        // check phien dang nhap het han day ve login page. * 1000 do value of getTime la milliseconds
        if(decodedToken?.exp * 1000 < new Date().getTime()){
            location.href= "/auth/login"
            return config
        }
        // con han gan token vao Authorization gui req di   
        config.headers.Authorization = `Bearer ${getValueFromLocalStorage('token')}`

    } catch (error) {
        location.href= "/auth/login"
        console.log(error);
    }

    return config
})

export const login = (username, password) => {
    return instance.post("/user/login", {username, password})
}

export const register = (username, password) => {
    return instance.post("/user/signup", {username, password})

}

export const createMovie = (data) => {
    return authInstance.post('/movie', data)
}


export const getMovie = (pageSize, pageIndex) => {
    return instance.get(`/movie?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}



export const deleteMovie = (id) => {
    return authInstance.delete(`/movie/${id}`)
}


export const getMovieById = (id) => {
    return instance.get(`/movie/${id}`)
}


export const editMovie = (id, data) => {
    return authInstance.put(`/movie/${id}`, data)
}







