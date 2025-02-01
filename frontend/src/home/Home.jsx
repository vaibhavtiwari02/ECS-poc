import { Box, Button } from '@mui/material'

const Home = ({ user, handleLogOut }) => {
  return (
    <div className="flex h-screen w-full justify-center items-center bg-[#6E6E6E00] ">

      <Box className="flex flex-col gap-4 p-8 border rounded-lg w-1/2 h-[32rem] ">
        <h1>Hi {user?.name}</h1>
        <span>  Your Email : {user?.email}</span>
        <Button onClick={() => handleLogOut()} variant='contained'>Log Out</Button>
      </Box>
    </div>
  )
}

export default Home