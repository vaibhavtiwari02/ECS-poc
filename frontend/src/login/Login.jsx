import { Box, Button, Input, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"

const Login = ({ user, setUser, setIsLoggedIn }) => {
  const [data, setData] = useState({
    email: "",
    password: ""
  })


  const handleLoging = async () => {
  try{
    const response = await axios.post("http://localhost:5000/api/users/login", data)  // Enter Your Backend Domain Here 
    setUser({ email: response?.data?.User?.email, name: response?.data?.User?.name })
    setIsLoggedIn(true)
  }
  catch(error){
    alert("User not Registered or Incorrect Password")
  }


  }



  return (
    <div className="flex h-screen w-full justify-center items-center bg-[#6E6E6E00] ">
      <Box className="flex flex-col gap-4 p-8 border rounded-lg w-1/2 h-[32rem] ">
        <Typography>Email </Typography>
        <Input placeholder="Email" type="text" value={data?.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        <Typography >Password </Typography>
        <Input placeholder="password" type="password" value={data?.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
        <Button variant="contained" onClick={() => handleLoging()}>Login</Button>
      </Box>



    </div>
  )
}

export default Login