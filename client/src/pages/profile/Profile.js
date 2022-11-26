import React from 'react'
import { useDispatch } from 'react-redux'
import { useRedirectLoggedOutUser } from '../../hooks/useRedirectLoggedOutUser'
import { SET_NAME, SET_USER } from '../../redux/features/authSlice'
import { getUser } from '../../services/authService'
import "./Profile.scss"

export default function Profile() {
    useRedirectLoggedOutUser("login")
    const dispatch = useDispatch()

    const [profile, setProfile] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        setIsLoading(true)
        async function getUserData() {
            const data = await getUser()
            console.log(data);
            
            setProfile(data)
            setIsLoading(false)
            dispatch(SET_USER(data))
            dispatch(SET_NAME(data.name))
        }

        getUserData()
    },[dispatch])
  return (
    <div>Profile</div>
  )
}
