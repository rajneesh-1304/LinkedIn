'use client';
import LoginForm from '../../components/Login/LoginForm';
import './login.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const login = () => {
  return (
    <div className='login_container'>
      <Box className="top-logo" onClick={() => window.location.href = '/login'}>
        <Typography className="signin-logo" sx={{fontSize:'2.5vh'}}>
          Linked
          <span className="signin-logo-in">in</span>
        </Typography>
      </Box>
      <div className='login_form'>
        <div>
          <LoginForm/>
        </div>
      </div>
    </div>
  )
}

export default login