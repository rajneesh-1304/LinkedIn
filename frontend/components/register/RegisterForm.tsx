"use client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import "./register.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth, provider, db, gitProvider } from "../../app/config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { registerThunk } from "@//redux/features/users/userSlice";
import { useAppDispatch } from "@//redux/hooks";
import { FcGoogle } from "react-icons/fc";
import {
  Divider,
  Typography,
} from "@mui/material";


const RegisterUserSchema = z.object({

  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .regex(/^\S*$/, "Password cannot contain spaces")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[!@#$%^&*]/, "Must contain at least one special character"),
});

type RegisterFormInputs = z.infer<typeof RegisterUserSchema>;

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(prev => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);


  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSignIn = async () => {
    if(googleLoading){
      return;
    }
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      
      if (!user.email) {
        throw new Error("Google account has no email");
      }

      const registerData = {
        email: user.email,
        firstName: user.displayName,
        tokenId: token,
      };

      const registerResponse=await dispatch(registerThunk(registerData)).unwrap();

      if (!registerThunk.fulfilled.match(registerResponse)) {
        await signOut(auth);
        throw new Error("Registration failed");
      } else {
      setSnackbarMessage("Account created successfully");
      setSnackbarOpen(true);
      router.push('/')
      }
    } catch (err: any) {
      await signOut(auth);
      console.log(err, 'error is here ')
      const message =
        err?.message?.includes("email-already-in-use") ||
          err?.response?.data?.message?.includes("Email already registered")
          ? "User already exists, please login"
          : err?.message || "Registration failed";

      setSnackbarMessage(message);
      setSnackbarOpen(true);
    }
    finally {
      setGoogleLoading(false);
    }
  };

  const onSubmit = async (data: RegisterFormInputs) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = response.user;
      const token = await user.getIdToken();

      const dat = {
        email: data.email,
        tokenId: token,
      }
      await dispatch(registerThunk(dat)).unwrap();
      setTimeout(() => {
        router.push('/users');
      }, 1200);
    }
    catch (err: any) {
      const message =
        err?.message?.includes("email-already-in-use") ||
          err?.response?.data?.message?.includes("Email already registered")
          ? "User already exists, please login"
          : err?.message || "Registration failed";

      setSnackbarMessage(message);
      setSnackbarOpen(true);
    }
    finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  useEffect(() => {
    console.log(errors)
  }, [errors])


  return (
    <div className="main-form">
      <form className="formm" onSubmit={handleSubmit(onSubmit)}>
        <h1 className='register_heading' >Create Account</h1>
        <Box sx={{ display: "flex", flexDirection: "column", width: 320, gap: 2, mt: 1, padding: 1, paddingBottom: 1 }}>


          <FormControl variant="standard">
            <TextField
              label="Email"
              size="small"
              variant="outlined"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </FormControl>

          <FormControl variant="standard" fullWidth>
            <TextField
              label="Password"
              size="small"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Typography className="terms-text" style={{ fontSize: '12px', marginTop: '15px', marginBottom: "10px", textAlign: 'center' }}>
            By clicking Continue, you agree to LinkedIn’s
            <span className="blue-link"> User Agreement</span>,
            <span className="blue-link"> Privacy Policy</span>, and
            <span className="blue-link"> Cookie Policy</span>.
          </Typography>

          <Button fullWidth
            variant="contained"
            className="signin-btn" style={{ marginTop: '5px' }} type="submit" disabled={loading}>
              {loading ? "Joining..." : "Agree & Join"}
          </Button>
        </Box>

        <Divider>or</Divider>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleClose}
          message={snackbarMessage}
        ></Snackbar>
      </form>
      <Button fullWidth 
        variant="outlined" onClick={handleSignIn} className="signin" disabled={googleLoading} >
          {googleLoading ? "Signing Up..." : (
            <>
        <FcGoogle style={{ height: "30px", marginRight: "5px" }} />Sign Up With Google
            </>
          )}
      </Button>

      <div
        className='login'><p>Already Registered <span className='login_link' onClick={() => { router.push('/login') }}>Login</span></p>
      </div>

    </div>
  );
}
