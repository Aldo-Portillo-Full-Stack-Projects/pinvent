import axios from "axios"
import {toast} from 'react-toastify'

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


export const registerUser = async (userData) => {
    try{    
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData, {withCredentials: true});
        if (response.statusText === "OK") {
            toast.success("Registered Successfully")
        }
        return response.data
    } catch(err){
        const message = (err.response && err.response.data & err.response.data.message)|| err.message || err.toString();
        toast.err(err)
        
    }
}