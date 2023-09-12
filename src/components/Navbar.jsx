import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = (props) => {

  const {user, logOut} = UserAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {await logOut()
    } catch (error) {console.log(error)}
  }
  
  

  return (
    <div className="header">
      <h1 className="title">
        Professional Learning Diary
      </h1>
      <button 
      className="switch-btn"
      onClick={props.switch}>
        {`Switch to ${props.seeAdmin ? 'Learning Log' : 'Admin'}`}
      </button>
      <div className="user-name">
        {user && <p>Welcome, {user?.displayName}</p>}
      </div>
      {user?.displayName ? 
      <button
      className="logout-btn"
      onClick={handleSignOut}
      >Logout</button> : 
      <Link to='signin' className="signin">Sign in</Link>}
      
    </div>
  )
}

export default Navbar