'use client'
import './user.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserForm from '@/components/userInfo/UserInfo';

const register = () => {
  return (
    <div className='login_container'>
      <Box className="top-logo"  onClick={() => window.location.href = '/login'}>
        <Typography className="signin-logo" sx={{fontSize:'2.5vh'}}>
          Linked
          <span className="signin-logo-in">in</span>
        </Typography>
      </Box>
      <div className='login_form'>
        <h1 className="heady">Join LinkedIn now — it’s free!</h1>
        <div>
          <UserForm/>
        </div>
      </div>
    </div>
  )
}

export default register