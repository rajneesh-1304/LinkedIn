import { privateApi } from "@/components/privateApi";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const addFollowing = async (id: string,userId: any) => {
  try {
    const url = `${BASE_URL}/follow/add/${id}`
    const res = await privateApi.post(url, {userId}, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in adding follower:", error);
    throw error;
  }
}

export const removeFollowing = async (id: string,userId: any) => {
  try {
    const url = `${BASE_URL}/follow/remove/${id}`
    const res = await privateApi.post(url, {userId}, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in removing following:", error);
    throw error;
  }
}

export const checkFollowing= async (id: string,userId: any) => {
  try {
    const url = `${BASE_URL}/follow/check/${id}/following/${userId}`
    const res = await privateApi.get(url,  {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in removing following:", error);
    throw error;
  }
}


export const getTotalFollowing = async (id: string) => {
  try {
    const url = `${BASE_URL}/follow/total/${id}`
    const res = await privateApi.get(url, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in fetching following:", error);
    throw error;
  }
}