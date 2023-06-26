import React from 'react'
import './Navbar.css'
import {BsCartDash, BsSearchHeart} from 'react-icons/bs'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="left-navbar">
          left
          <BsSearchHeart/>
      </div>
      <div className="middle-navbar">
          RMOP Wear
      </div>
      <div className="right-navbar">
          <p>signup</p>
          <p>signIn</p>
          <BsCartDash/>
      </div>
    </div>
  )
}

export default Navbar



