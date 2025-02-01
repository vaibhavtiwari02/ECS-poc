import { useState } from 'react'
import './App.css'
import { Button } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Login from './login/Login'
import Home from './home/Home'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function App() {
  const [user,setUser] = useState({})
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const handleLogOut =async ()=>{
    setUser("")
    setIsLoggedIn(false)
   }

   useEffect(()=>{
    isLoggedIn?navigate("/home"):navigate("/")
   },[isLoggedIn])

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Login setUser={setUser} user={user} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/home' element={<Home handleLogOut={handleLogOut}  user={user}/>}/>

      </Routes>

    </>
  )
}

export default App
