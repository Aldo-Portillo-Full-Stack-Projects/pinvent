import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../card/Card';
import { changePassword } from '../../services/authService';

const initialState = {
    oldPassword: "",
    password: "",
    password2: "",
}

export default function ChangePassword() {

    const navigate = useNavigate()

    const [formData, setFormData] = React.useState(initialState);

    const {oldPassword, password, password2} = formData;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const changePasswordF = async (e) => {
        e.preventDefault()

        if(password !== password2) {
            return toast.error("New passwords do not match")
        }

        const formData = {
            oldPassword, 
            password
        }

        const data = await changePassword(formData)
        toast.success(data)
        navigate("/profile")
    }

  return (
    <div className='change-password'>
        <Card cardClass={"password-card"}>
            <h3>Change Password</h3>
            <form onSubmit={changePasswordF} className="--form-control">
                <input type="password" name="oldPassword" required placeholder='Old Password' value={oldPassword} onChange={handleInputChange} />
                <input type="password" name="password" required placeholder='New Password' value={password} onChange={handleInputChange} />
                <input type="password" name="password2" required placeholder='Confirm New Password' value={password2} onChange={handleInputChange} />
                <button type="submit" className='--btn --btn-primary'>Change Password</button>
            </form>
        </Card>
    </div>
  )
}
