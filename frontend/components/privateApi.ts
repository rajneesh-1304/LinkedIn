import { logout, logoutThunk } from "@/redux/features/users/userSlice";
import axios from "axios";

export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL2 || process.env.NEXT_PUBLIC_API_URL3 || process.env.NEXT_PUBLIC_API_URL4,
  withCredentials: true,
});

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

privateApi.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      if (store) {
        store.dispatch(logoutThunk());
      } else {
        console.error("Logout failed: store is still undefined.");
      }
    }
    return Promise.reject(error);
  },
);