"use client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import "./userinfo.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@//redux/hooks";
import { addProfileThunk, getProfileThunk } from "@/redux/features/profile/profileSlice";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/app/config/firebase";
import { registerThunk } from "@/redux/features/users/userSlice";

const userInfoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces"),

  lastName: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces"),
});

type UserFormInputs = z.infer<typeof userInfoSchema>;

export default function UserForm({ email, password }: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector(state => state.users.currentUser);
  const userId = currentUser?.id;

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const onSubmit = async (data: UserFormInputs) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      const token = await user.getIdToken();
      const userData = {
        token: token,
        email: email,
        firstName: data.firstName,
        lastName: data.lastName
      }
      const response2 = await dispatch(registerThunk(userData)).unwrap();
      setSnackbarMessage("Account created successfully");
      setSnackbarOpen(true);
      router.push('/')
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
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: ""
    },
  });


  useEffect(() => {
    console.log(errors)
  }, [errors])


  return (
    <div className="main-form">
      <form className="formm" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", width: 320, gap: 3, mt: 1, padding: 1, paddingBottom: 1 }}>

          <FormControl variant="standard">
            <TextField
              label="First Name"
              variant="outlined"
              size="small"
              {...register("firstName", { required: "First Name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ""}
            />
          </FormControl>

          <FormControl variant="standard">
            <TextField
              label="Last Name"
              size="small"
              variant="outlined"
              {...register("lastName", { required: "Last Name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ""}
            />
          </FormControl>

          <Button fullWidth
            variant="contained"
            className="signin-btn" style={{ marginTop: '5px' }} type="submit" disabled={loading}>
            {loading ? "Continue" : "Continue"}
          </Button>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleClose}
          message={snackbarMessage}
        ></Snackbar>
      </form>

    </div>
  );
}
