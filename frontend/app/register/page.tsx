'use client'
import RegisterForm from '@/components/register/RegisterForm'
import './register.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '@/redux/hooks';
import UserForm from '@/components/userInfo/UserInfo';
import { useState } from 'react';

const register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [second, setSecond] = useState(false);
  const currentUser = useAppSelector(state => state.users.currentUser);
  return (
    <div className='login_container'>
      <Box className="top-logo" onClick={() => window.location.href = '/login'}>
        <Typography className="signin-logo" sx={{ fontSize: '2.5vh' }}>
          Linked
          <span className="signin-logo-in">in</span>
        </Typography>
      </Box>
      <div className='login_form'>
        <>
          {!second && <><h1 className="heady">Make the most of your professional life</h1>
            <div>
              <RegisterForm setEmail={setEmail} setPassword={setPassword} setSecond={setSecond} />
            </div></>}
        </>

        :
        <>
          {second && <>
            <h1 className="heady">Join LinkedIn now — it’s free!</h1>
            <div>
              <UserForm email={email} password={password} />
            </div>
          </>}
        </>
      </div>
    </div>
  )
}

export default register