import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {

  const {user, logOut} = UserAuth()

  const handleSignOut = async () => {
    try {await logOut()
    } catch (error) {console.log(error)}
  }

  return (
    <div className="header">
      <h1 className="title">
        Professional Learning Diary
      </h1>
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