import { useContext, createContext, useEffect, useState } from "react";
import { 
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithRedirect
} from "firebase/auth";
import {auth} from '../../firebase';

const Authcontext = createContext()

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState ({})


  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    // signInWithRedirect(auth, provider)
  }

  const logOut = () => {signOut(auth)}

  useEffect (()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  },[])


  return (
    <Authcontext.Provider value={{googleSignIn, logOut, user}}>
      {children}
    </Authcontext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(Authcontext)
}