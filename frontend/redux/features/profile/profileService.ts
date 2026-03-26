import { privateApi } from "@/components/privateApi";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const addProfile = async (userId: string, userData: any) => {
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

export const addEducation = async (userId: string, formDataToSend: any) => {
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

export const addExperience = async (userId: string, formDataToSend: any) => {
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

export const fetchUsers = async ({ page, limit }: any) => {
  try {
    const res = await privateApi.get(`${BASE_URL}/profile/getAll`, {
      params: {
        page,
        limit,
      },
    })
    return res.data;
  } catch (err: any) {
    console.error('Error fetching users:', err);
    throw err?.response?.data || err.message;
  }
}

export const fetchAllSkills = async () => {
  try {
    const res = await privateApi.get(`${BASE_URL}/profile/allSkills`, {
      withCredentials: true,
    })
    return res.data;
  } catch (error: any) {
    console.log('Error in fetchin skills', error);
    throw error?.response?.data || error.message;
  }
}

export const addSkills = async (id: string, skills: any) => {
  console.log(skills, 'abc')
  try {
    const res = await privateApi.post(`${BASE_URL}/profile/skills/${id}`, { skills }, {
      withCredentials: true,
    })
    return res.data;
  } catch (error: any) {
    console.log('Error in fetchin skills', error);
    throw error?.response?.data || error.message;
  }
}

export const getSkills = async (id: any) => {
  try {
    const res = await privateApi.get(`${BASE_URL}/profile/skills/${id}`, {
      withCredentials: true,
    })
    return res.data;
  } catch (error: any) {
    console.log('Error in fetchin skills', error);
    throw error?.response?.data || error.message;
  }
}

export const getConnectionById = async (id: any) => {
  try {
    const res = await privateApi.get(`${BASE_URL}/connection/${id}`, {
      withCredentials: true,
    })
    return res.data;
  } catch (error: any) {
    console.log('Error in fetchin skills', error);
    throw error?.response?.data || error.message;
  }
}

export const getProfileBySearchTerm = async (searchValue: any) => {
  try {
    const res = await privateApi.get(`${BASE_URL}/profile/search?searchTerm=${searchValue}`,{
      withCredentials: true,
    })
    return res.data;
  } catch (error:any) {
    console.log('Error in fetchin searched profiles', error);
    throw error?.response?.data || error.message;
  }
}

export const addProfileFirst = async (userData: any) => {
  try {
    const url = `${BASE_URL}/profile/add`
    const res = await privateApi.post(url, userData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error in Reigstering User:", error);
    throw error;
  }
}