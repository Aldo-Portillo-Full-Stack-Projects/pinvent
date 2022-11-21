import React from 'react'
import styles from "./auth.module.scss"
import { BiLogIn} from "react-icons/bi"
import Card from "../../components/card/Card"
import {Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const initialState = {
  email: "",
  password: "",
}


export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState(initialState)
  const { email, password } = formData

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const login = async (e) => {
    e.preventDefault();

    console.log(formData)
  } 

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>

          <form onSubmit={login}>
            <input type="text" placeholder='Email' required name="email" value={email} onChange={handleInputChange}/>
            <input type="password" placeholder='Password' required name="password" value={password} onChange={handleInputChange}/>
            <button type="submit" className='--btn --btn-primary --btn-block'>Login</button>
          </form>
          <Link to="/forgot">Forgot Password</Link>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}
