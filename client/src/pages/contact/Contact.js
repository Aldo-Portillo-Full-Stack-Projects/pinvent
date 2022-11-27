import React from 'react'
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import {GoLocation} from 'react-icons/go'
import Card from '../../components/card/Card'
import "./Contact.scss"
export default function Contact() {

    const [subject, setSubject] = React.useState("")
    const [message, setMessage] = React.useState("")

    const data = {
        subject, 
        message
    }

    const sendEmail = (e) => {
        e.preventDefault()
    }
  return (
    <div className='contact'>
        <h3 className='--mt'>Contact Us</h3>
        <div className='section'>
            <form onSubmit={sendEmail}>
                <Card cardClass="card">
                    <label>Subject</label>
                    <input type="text" name="subject" placeholder='Subject' required value={subject} onChange={(e) => {setSubject(e.target.value)}} />
                    <label>Subject</label>
                    <textarea cols="30" rows="10" name="message" required value={message} onChange={(e) => {setMessage(e.target.value)}}></textarea>
                    <button className='--btn --btn-primary'>Send Message</button>
                </Card>
            </form>
            <div className='details'>
                <Card cardClass={"card2"}>
                    <h3>Contact Info: </h3>
                    <p>Fill in the form or reach us at...</p>

                    <div className='icons'>
                        <span>
                            <FaPhoneAlt /> <p>1234567890</p>
                        </span>
                        <span>
                            <FaEnvelope /> <p>404@inventory.com</p>
                        </span>
                        <span>
                            <FaTwitter /> <p>@aldoportilloDev</p>
                        </span>
                        <span>
                            <GoLocation /> <p>Chicago, IL</p>
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  )
}
