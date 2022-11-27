import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import { useRedirectLoggedOutUser } from '../../hooks/useRedirectLoggedOutUser'
import { selectUser } from '../../redux/features/authSlice'
import "./Profile.scss"


export default function EditProfile() {
    useRedirectLoggedOutUser("login")
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    const {email} = user;

    React.useEffect(() => {
        if(!email) {
            navigate("/profile")
        }
    },[email, navigate])

    const initialState = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        photo: user?.photo,

    }
    const [profile, setProfile] = React.useState(initialState)
    const [profileImage, setProfileImage] = React.useState()
    const [isLoading, setIsLoading] = React.useState(false)

    const handleInputChange = (e) => {
        const {name, value} = e.targetl;
        setProfile({...profile, [name]: value})
    }

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
    }

    const saveProfile = (e) => {
        e.preventDefault()
    }
  return (
    <div className='profile --my2'>
        {isLoading && <Loader />}
        <Card cardClass={"card --flex-dir-column"}>
                <span className='profile-photo'>
                    <img src={user?.photo} alt="profile pic" />
                </span>
                <form className='--form-control --m' onSubmit={saveProfile}>
                <span className='profile-data'>
                    <p>
                        <label>Name: </label>
                        <input type="text" name="name" value={profile?.name} onChange={handleInputChange}/>
                    </p>
                    <p>
                        <label>Email: </label>
                        <input type="text" name="email" value={profile?.email} disabled />
                        <br />
                        <code>Email cannot be changed</code>
                    </p>
                    <p>
                        <label>Phone: </label>
                        <input type="text" name="phone" value={profile?.phone} onChange={handleInputChange}/>
                    </p>
                    <p>
                        <label>Bio: </label>
                        <textarea type="text" name="bio" value={profile?.bio} onChange={handleInputChange} cols="30" rows="10"></textarea>
                    </p>
                    <p>
                        <label>Photo: </label>
                        <input type="file" name="image" onChange={handleImageChange} />
                    </p>
                    <div>
                        <Link to="/edit-profile">
                            <button className='--btn --btn-primary'>Edit Profile</button>
                        </Link>
                    </div>
                </span>
                </form>
            </Card>
    </div>
  )
}
