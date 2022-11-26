import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import { SpinnerImg } from '../../components/loader/Loader'
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
    <div className='profile --my2'>
        {isLoading && <SpinnerImg />}
        <>
        {!isLoading && profile === null ? (
            <p>Something went wrong. Reload Page.</p>
        ): (
            <Card cardClass={"card --flex-dir-column"}>
                <span className='profile-photo'>
                    <img src={profile?.photo} alt="profile pic" />
                </span>
                <span className='profile-data'>
                    <p>
                        <b>Name: </b>{profile?.name}
                    </p>
                    <p>
                        <b>Email: </b>{profile?.email}
                    </p>
                    <p>
                        <b>Phone: </b>{profile?.phone}
                    </p>
                    <p>
                        <b>Bio: </b>{profile?.bio}
                    </p>
                    <div>
                        <Link to="/edit-profile">
                            <button className='--btn --btn-primary'>Edit Profile</button>
                        </Link>
                    </div>
                </span>
            </Card>
        )}
        </>
    </div>
  )
}
