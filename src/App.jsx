import React, { useState } from "react"
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Signin from "./components/Signin";
import Account from './components/Account'
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";

function App() {
    const [admin, setAdmin] = useState(false)
    return (
      <div>
          <AuthContextProvider>
            {/* <Navbar /> */}
          <Routes>
            <Route path='/' element={<Signin />} />
            <Route path='account' element={<Protected> <Account /> </Protected>} />
            <Route path='admin' element={<Admin />}></Route>

          </Routes>
          </AuthContextProvider>
      </div> 
         )
    }
 
  export default App

    