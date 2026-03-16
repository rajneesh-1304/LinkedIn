import { privateApi } from "@/components/privateApi";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const addConnection = async (id: string,userId: any) => {
  try {
    const url = `${BASE_URL}/connection/add/${id}`
    const res = await privateApi.post(url, {userId}, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in adding connection:", error);
    throw error;
  }
}

export const removeConnection = async (id: string,userId: any) => {
  try {
    const url = `${BASE_URL}/connection/remove/${id}`
    const res = await privateApi.post(url, {userId}, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in removing connection:", error);
    throw error;
  }
}

export const updateConnection = async (id: string,userId: any) => {
  try {
    const url = `${BASE_URL}/connection/update/${id}`
    const res = await privateApi.patch(url, {userId}, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in updating connection:", error);
    throw error;
  }
}

export const checkConnection = async (id: string,userId: any) => {
  try {
    const url = `${BASE_URL}/connection/check/${id}/connection/${userId}`
    const res = await privateApi.get(url, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in updating connection:", error);
    throw error;
  }
}

export const getTotalConnection = async (id: string) => {
  try {
    const url = `${BASE_URL}/connection/total/${id}`
    const res = await privateApi.get(url, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in fetching connection:", error);
    throw error;
  }
}