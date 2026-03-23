'use client';

import "./skillmodal.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addSkillsThunk, getAllSkillsThunk, getSkillsThunk } from "@/redux/features/profile/profileSlice";

type SkillModalProps = {
  close: () => void;
};

const skillSchema = z.object({
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

type SkillFormData = z.infer<typeof skillSchema>;

export default function SkillModal({ close }: SkillModalProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const allSkills = useAppSelector(state => state.profile.totalSkills);
  const currentUser = useAppSelector(state => state.users.currentUser);
  const id = currentUser?.id;

  useEffect(() => {
    dispatch(getAllSkillsThunk());
  }, [])

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skills: [],
    },
  });

  const onSubmit = async (data: SkillFormData) => {
    try {
      await dispatch(addSkillsThunk({ id: id, skills: data.skills })).unwrap();
      dispatch(getSkillsThunk(id));
      setSnackbarOpen(true);

      setTimeout(() => {
        close();
      }, 1000);
    } catch (error) {
      setSnackbarOpen(true);

      setTimeout(() => {
        close();
      }, 1000);
    }

  };

  return (
    <div className="modal_overlay">
      <div className="modal">
        <h2>Add Skills</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: 350 }}>

            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  freeSolo
                  options={allSkills || []}
                  value={field.value}
                  onChange={(_, newValue) => field.onChange(newValue)}

                  onInputChange={(event, value, reason) => {
                    if (reason === "blur" && value) {
                      field.onChange([...(field.value || []), value]);
                    }
                  }}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select or type skills"
                      error={!!errors.skills}
                      helperText={errors.skills?.message}
                    />
                  )}
                />
              )}
            />

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
        message="Skills saved!"
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
}