import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function Signin () {

  const {googleSignIn, user} = UserAuth();
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try { await googleSignIn()

    } catch (error) {
      console.log(error)
    }
  }

  useEffect (()=>{
    if(user != null) {
      navigate('/account')
    }
  },[user])

  return (
    <div>
        <h1 className='main-login'>
          Profesional Learning Diary Sign in
        </h1>
      <div className='main-signin-container'>
        <button 
        className='google-signin-btn'
        onClick={handleGoogleSignIn}
        >Sign in</button>

      </div>
    </div>
  )
}

export default Signin