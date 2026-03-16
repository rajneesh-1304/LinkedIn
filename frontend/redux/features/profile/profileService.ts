import { privateApi } from "@/components/privateApi";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const addProfile = async (userId: string,userData: any) => {
  try {
    const url = `${BASE_URL}/profile/update/${userId}`
    const res = await privateApi.patch(url, userData, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in Reigstering User:", error);
    throw error;
  }
}

export const getProfile = async (userId: any) => {
  try {
    const url = `${BASE_URL}/profile/profile/${userId}`
    const res = await privateApi.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in fetching User:", error);
    throw error;
  }
}

export const addEducation = async (userId: string,formDataToSend: any) => {
  try {
    const url = `${BASE_URL}/profile/education/${userId}`
    const res = await privateApi.post(url, formDataToSend, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in adding education details:", error);
    throw error;
  }
}

export const getEducation = async (userId: any) => {
  try {
    const url = `${BASE_URL}/profile/education/${userId}`
    const res = await privateApi.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in fetching education details:", error);
    throw error;
  }
}

export const addExperience = async (userId: string,formDataToSend: any) => {
  try {
    const url = `${BASE_URL}/profile/experience/${userId}`
    const res = await privateApi.post(url, formDataToSend, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in adding education details:", error);
    throw error;
  }
}

export const getExperience = async (userId: any) => {
  try {
    const url = `${BASE_URL}/profile/experience/${userId}`
    const res = await privateApi.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    console.error("Error in fetching education details:", error);
    throw error;
  }
}