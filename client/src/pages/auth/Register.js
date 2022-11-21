import React from 'react'
import styles from "./auth.module.scss"
import { AiOutlineUserAdd } from "react-icons/ai"
import Card from "../../components/card/Card"
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {validateEmail, registerUser} from "../../services/authService.js"
import {useDispatch} from 'react-redux'
import { SET_LOGIN, SET_NAME, SET_USER} from '../../redux/features/authSlice'


const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
}

export default function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(initialState)
  const [formData, setFormData] = React.useState(initialState)
  const { name, email, password, password2 } = formData

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const register = async (e) => {
    e.preventDefault()
    
    if(!name || !email || !password){
      return toast.error("All fields are required")
    }

    if(password.length < 6){
      return toast.error("Password must be greater than 6 characters")
    }

    if(!validateEmail(email)){
      return toast.error("Please enter a valid email")
    }

    if(password !== password2){
      return toast.error("Passwords do not match")
    }

    const userData = {
      name, email, password
    }

    setIsLoading(true)

    try {
      const data = await registerUser(userData)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_USER(data.name))
      navigate("/dashboard")
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.log(err.message)
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <AiOutlineUserAdd size={35} color="#999" />
          </div>
          <h2>Register</h2>

          <form onSubmit={register}>
            <input type="text" placeholder='Name' required name="name" value={name} onChange={handleInputChange}/>
            <input type="text" placeholder='Email' required name="email" value={email} onChange={handleInputChange}/>
            <input type="password" placeholder='Password' required name="password" value={password} onChange={handleInputChange}/>
            <input type="password" placeholder='Confirm Password' required name="password2" value={password2} onChange={handleInputChange}/>
            <button type="submit" className='--btn --btn-primary --btn-block'>Register</button>
          </form>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Already have an account? &nbsp;</p>
            <Link to="/login">Login</Link> 
          </span>
        </div>
      </Card>
    </div>
  )
}
