'use client'
import RegisterForm from '@/components/register/RegisterForm'
import './register.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        <h1 className="heady">Make the most of your professional life</h1>
        <div>
          <RegisterForm/>
        </div>
      </div>
    </div>
  )
}

export default register