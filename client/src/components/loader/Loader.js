import React from 'react'
import loaderImg from "../../assets/loader.gif"
import ReactDOM from 'react-dom'
import "./Loader.scss"

export default function Loader() {
  return ReactDOM.createPortal(
    <div className='wrapper'>
      <div className='loader'>
        <img src={loaderImg} alt="loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  )
}

export function SpinnerImg() {
  return(
    <div className='--center-all'>
      <img src={loaderImg} alt="loading..." />
    </div>
  )
}