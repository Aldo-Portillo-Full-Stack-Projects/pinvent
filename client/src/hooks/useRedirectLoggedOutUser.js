import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { SET_LOGIN } from "../redux/features/authSlice"
import { getLoginStatus } from "../services/authService"

export const useRedirectLoggedOutUser = (path) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await getLoginStatus() //Returns true of false depending on login status
            dispatch(SET_LOGIN(isLoggedIn)) //Modifies Redux state

            if(!isLoggedIn) {
                toast.info("Session expired, please login")
                navigate(path)
                return
            }
        };

        redirectLoggedOutUser()
    }, [navigate, path, dispatch])
}