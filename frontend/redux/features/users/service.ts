import { privateApi } from "@/components/privateApi";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL3;

export const loginUser = async (loginData: any) => {
  try {
    const url = `${BASE_URL}/auth/login`
    const res = await axios.post(
      url,
      {
        tokenId: loginData.tokenId,
        email: loginData.email, 
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
      
    );
    return res.data;
  } catch (error) {
    console.error("Error in Reigstering User:", error);
    throw error;
  }
}

export const registerUser = async (registerData: any) => {
  try {
    const url = `${BASE_URL}/auth/register`;
    const res = await axios.post(url, registerData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deleteUserr = async (id: any) => {
  try {
    await axios.patch(`${BASE_URL}/auth/delete/${id}`)
  } catch (err: any) {
    console.error('Error deleting users:', err);
    throw err?.response?.data || err.message;
  }
}

export const logoutUser = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
}

export const signInWithGoogle = async (singInData: any) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signin`,
      {
        email: singInData.email,
        tokenId: singInData.tokenId,
        firstName: singInData.firstName
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
}