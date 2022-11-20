import React from 'react'
import styles from "./auth.module.scss"
import { MdPassword} from "react-icons/md"
import Card from "../../components/card/Card"
import {Link } from 'react-router-dom'

export default function Reset() {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form>
            <input type="password" placeholder='Password' required name="password" />
            <input type="password" placeholder='Confirm Password' required name="confirmPassword" />
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

