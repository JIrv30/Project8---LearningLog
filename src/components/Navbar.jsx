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
    <div>
      <h1 className="Header">
        Profesional Learning Diary
      </h1>
      <div className="user-name">
        <p>Welcolme, {user?.displayName}</p>
      </div>
      {user?.displayName ? 
      <button
      className="logout-btn"
      onClick={handleSignOut}
      >Logout</button> : 
      <Link to='signin'>Sign in</Link>}
      
    </div>
  )
}

export default Navbar