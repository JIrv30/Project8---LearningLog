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
    <div className='main-login'>
      <div className='main-signin-container'>
        <h1 className='PLD-title'>
          Professional Learning Diary Sign in
        </h1>
        <button 
        className='google-signin-btn'
        onClick={handleGoogleSignIn}
        ><span>Sign in</span></button>
        

      </div>
    </div>
  )
}

export default Signin