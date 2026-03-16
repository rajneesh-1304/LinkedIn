'use client';

import "./experiencemodal.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box, Button, FormControl, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addEducationThunk, addExperienceThunk, addProfileThunk, getEducationThunk, getExperienceThunk, getProfileThunk } from "@/redux/features/profile/profileSlice";

type ExperienceModalProps = {
    close: () => void;
};

const educationSchema = z.object({
    company: z.string().min(3, "Institute Name must be at least 3 characters"),
    position: z.string().min(3, "Degree Name must be at least 3 characters"),
    location: z.string().min(1, "Location is required"),
    startDate: z
        .string()
        .nonempty("Start Date is required"),
    endDate: z
        .string()
        .nonempty("End Date is required")
});
type ExperienceFormData = z.infer<typeof educationSchema>;

export default function ExperienceModal({ close }: ExperienceModalProps) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.users.currentUser);
    const userId = currentUser?.id;
    const err: any = useAppSelector(state => state.profile.error);

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ExperienceFormData>({
        resolver: zodResolver(educationSchema),
    });

    const onSubmit = async (formData: ExperienceFormData) => {
        const formDataToSend = new FormData();
        formDataToSend.append("company", formData.company);
        formDataToSend.append("position", formData.position);
        formDataToSend.append("location", formData.location);
        const formattedStart = new Date(formData.startDate).toISOString().split('T')[0];
        const formattedEnd = new Date(formData.endDate).toISOString().split('T')[0];

        formDataToSend.append("startDate", formattedStart);
        formDataToSend.append("endDate", formattedEnd);

        try {
            await dispatch(addExperienceThunk({ userId, formData })).unwrap();

            setSnackbarMessage("Experience added successfully!");
            setSnackbarOpen(true);
            dispatch(getExperienceThunk(userId));

            setTimeout(() => close(), 1000);
        } catch (error: any) {
            setSnackbarMessage(err);
            setSnackbarOpen(true);
        }

        reset();
    };

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    return (
        <div className="modal_overlay">
            <div className="modal">
                <h2>Add Education</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="modal_form">
                    <Box sx={{ display: "flex", flexDirection: "column", width: 350, gap: 1 }}>
                        <FormControl>
                            <TextField
                                label="Company Name"
                                size="small"
                                {...register("company")}
                                error={!!errors.company}
                                helperText={errors.company?.message}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                label="Position Name"
                                size="small"
                                {...register("position")}
                                error={!!errors.position}
                                helperText={errors.position?.message}
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
                            <TextField
                                type="date"
                                label="Start Date"
                                size="small"
                                {...register("startDate")}
                                error={!!errors.startDate}
                                helperText={errors.startDate?.message}
                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                type="date"
                                label="End Date"
                                size="small"
                                {...register("endDate")}
                                error={!!errors.endDate}
                                helperText={errors.endDate?.message}
                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>

                        <div className="modal_actions">
                            <Button variant="contained" type="submit">Save</Button>
                            <Button variant="outlined" onClick={close}>Cancel</Button>
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