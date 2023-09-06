import React from "react"
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Signin from "./components/Signin";
import Home from "./components/Home";
import Account from './components/Account'
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";

function App() {
    
    return (
      <div>
          <AuthContextProvider>
            <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='account' element={<Protected> <Account /> </Protected>} />

          </Routes>
          </AuthContextProvider>
      </div> 
         )
    }
 
  export default App

    