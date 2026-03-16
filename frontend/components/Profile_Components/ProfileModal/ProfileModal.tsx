'use client';

import "./profilemode.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box, Button, FormControl, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addProfileThunk, getProfileThunk } from "@/redux/features/profile/profileSlice";

type ProfileModalProps = {
  close: () => void;
};

const profileSchema = z.object({
  firstName: z.string().min(3, "Name must be at least 3 characters"),
  lastName: z.string().min(3, "Name must be at least 3 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  image: z
    .any()
    .refine((file: File) => !!file, {
      message: "Please upload one image only",
    }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileModal({close }: ProfileModalProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const userId = currentUser?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (formData: ProfileFormData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("location", formData.location);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await dispatch(addProfileThunk({ userId, formDataToSend })).unwrap();

      setSnackbarMessage("Profile updated successfully!");
      setSnackbarOpen(true);
      dispatch(getProfileThunk(userId));

      setTimeout(() => close(), 1000);
    } catch (error: any) {
      setSnackbarMessage(error?.message || "Error updating profile");
      setSnackbarOpen(true);
    }

    reset();
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <div className="modal_overlay">
      <div className="modal">
        <h2>Update Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="modal_form">
          <Box sx={{ display: "flex", flexDirection: "column", width: 350, gap: 1 }}>
            <FormControl>
              <TextField
                label="First Name"
                size="small"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </FormControl>

            <FormControl>
              <TextField
                label="Last Name"
                size="small"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </FormControl>

            <FormControl>
              <TextField
                label="Location"
                size="small"
                {...register("location")}
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            </FormControl>

            <FormControl>
              <label className="upload-label">Upload Profile Image</label>

              <Controller
                name="image"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                  />
                )}
              />

              {errors.image && <p className="error-text">{errors.image.message as string}</p>}
            </FormControl>

            <div className="modal_actions">
              <Button variant="contained" type="submit">
                Save
              </Button>

              <Button variant="outlined" onClick={close}>
                Cancel
              </Button>
            </div>
          </Box>
        </form>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
}