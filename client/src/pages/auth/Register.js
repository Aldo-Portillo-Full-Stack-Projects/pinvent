import React from 'react'
import styles from "./auth.module.scss"
import { AiOutlineUserAdd } from "react-icons/ai"
import Card from "../../components/card/Card"
import {Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <AiOutlineUserAdd size={35} color="#999" />
          </div>
          <h2>Register</h2>

          <form>
            <input type="text" placeholder='Name' required name="name" />
            <input type="text" placeholder='Email' required name="email" />
            <input type="password" placeholder='Password' required name="password" />
            <input type="password" placeholder='Confirm Password' required name="confirmPassword" />
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
