import React from 'react'
import { toast } from 'react-toastify';

const initialState = {
    oldPassword: "",
    password: "",
    password2: "",
}

export default function ChangePassword() {

    const [formData, setFormData] = React.useState(initialState);

    const {oldPassword, password, password2} = formData;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const changePassword = async (e) => {
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
    }

  return (
    <div className='change-password'>
        
    </div>
  )
}
