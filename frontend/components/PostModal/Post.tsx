'use client';

import { useState } from "react";
import { Snackbar, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addPostThunk, fetchPostThunk } from "@/redux/features/post/postSlice";
import './post.css';

type PostModalProps = {
  close: () => void;
};

const postSchema = z.object({
  text: z.string().max(3000, "Post cannot exceed 3000 characters").optional(),
  images: z.array(z.any()).optional()
}).refine((data) => data.text || (data.images && data.images.length > 0), {
  message: "Post must contain text or image",
  path: ["text"]
});

type PostFormData = z.infer<typeof postSchema>;

export default function Post({ close }: PostModalProps) {

  const currentUser = useAppSelector(state => state.users.currentUser);
  const id:any = currentUser?.id;
  

  const [previews, setPreviews] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<PostFormData>({
    resolver: zodResolver(postSchema)
  });

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach(file => {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setSnackbarMessage("Only JPG, PNG, WEBP images are allowed");
        setSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setSnackbarMessage("Each image must be under 5MB");
        setSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    if (validFiles.length > 0) {
      setValue("images", validFiles);
      setPreviews(newPreviews);
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = (previews || []).filter((_, i) => i !== index);
    setPreviews(updatedFiles);

    const currentFiles: File[] = (document.querySelector<HTMLInputElement>('input[type="file"]')?.files ? Array.from(document.querySelector<HTMLInputElement>('input[type="file"]')!.files!) : []);
    currentFiles.splice(index, 1);
    setValue("images", currentFiles);
  };

  const onSubmit = async (data: PostFormData) => {
  try {
    if (!id) return;

    const formData = new FormData();
    if (data.text) formData.append("text", data.text);

    data.images?.forEach((file) => {
      formData.append("images", file);
    });

    await dispatch(addPostThunk({ id, formData })).unwrap();
    

    setSnackbarMessage("Post created successfully!");
    setSeverity("success");
    setSnackbarOpen(true);
    dispatch(fetchPostThunk(id));
    reset();
    setPreviews([]);
    setValue("images", []);
    setTimeout(() => close(), 1000);
  } catch (err: any) {
    setSnackbarMessage(err?.message || "Failed to create post");
    setSeverity("error");
    setSnackbarOpen(true);
  }
};

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <div className="modal_overlay">
      <div className="post_modal">

        <div className="post_header">
          <div className="post_user">
            <div className="avatar">{currentUser?.firstName[0]}</div>
            <div>
              <h4>{currentUser?.firstName}</h4>
              <p>Post to Anyone</p>
            </div>
          </div>
          <IconButton onClick={close}><CloseIcon /></IconButton>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <textarea
            className="post_input"
            placeholder="What do you want to talk about?"
            {...register("text")}
          />

          {errors.text && <p className="error_text">{errors.text.message}</p>}

          {previews.length > 0 && (
            <div className="image_preview_container">
              {previews.map((src, i) => (
                <div key={i} className="image_preview">
                  <img src={src} alt={`preview-${i}`} />
                  <IconButton className="remove_img" onClick={() => removeImage(i)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          )}

          <div className="post_actions">
            <div className="post_icons">
              <label className="icon_btn">
                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImages}
                />
                <ImageIcon />
              </label>

              <div className="icon_btn"><EventIcon /></div>
              <div className="icon_btn"><ArticleIcon /></div>
            </div>

            <button className="post_button" type="submit">Post</button>
          </div>

        </form>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}