import { privateApi } from "@/components/privateApi";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL4;

export const getNotification = async (userId: string) => {
  try {
    const url = `${BASE_URL}/notifications/${userId}`
    const res = await privateApi.get(url, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in Reigstering User:", error);
    throw error;
  }
}

