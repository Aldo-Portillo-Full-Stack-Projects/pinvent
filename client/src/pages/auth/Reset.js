import React from 'react'
import styles from "./auth.module.scss"
import { MdPassword} from "react-icons/md"
import Card from "../../components/card/Card"
import {Link, useParams, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { resetPassword } from '../../services/authService'

const initialState = {
  password: "",
  password2: "",
}

export default function Reset() {

  const [formData, setFormData] = React.useState(initialState)
  const { password, password2 } = formData

  const { resetToken } = useParams();

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const reset = async (e) => {
    e.preventDefault();

    if(!password || !password2){
      return toast.error("Please fill in all fields")
    }
    if(password.length < 6){
      return toast.error("Password must be greater than 6 characters")
    }

    if(password !== password2){
      return toast.error("Passwords do not match")
    }

    const userData = {
      password,
      password2
    }

    try {
      await resetPassword(userData, resetToken);
      navigate("/login")
      return toast.success("Password updated")
    } catch (err) {
      console.log(err.message)
    }
    
  }

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={reset}>
            <input type="password" placeholder='Password' required name="password" value={password} onChange={handleInputChange}/>
            <input type="password" placeholder='Confirm Password' required name="password2" value={password2} onChange={handleInputChange}/>
            <button type="submit" className='--btn --btn-primary --btn-block'>Reset Password</button>
            <div className={styles.links}>
              <Link to="/">- Home -</Link>
              <Link to="/login">- Login -</Link>
            </div>
          </form>

          
        </div>
      </Card>
    </div>
  )
}

