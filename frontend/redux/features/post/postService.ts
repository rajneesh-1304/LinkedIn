import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL2;

export const addPost = async (id: string, postData: any) => {
  try {
    const url = `${BASE_URL}/createpost/${id}`;
    const res = await axios.post(url, postData, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const fetchPost = async (userId:any) =>{
  try {
    const url =`${BASE_URL}/getPost/${userId}`;
     const res = await axios.get(url,{
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const toggleLike = async (id: string, data: any) =>{
  try {
    const url =`${BASE_URL}/like/${id}`;
     const res = await axios.patch(url, {data}, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const addComment = async (id: string, data: any) =>{
  try {
    const url =`${BASE_URL}/comment/${id}`;
     const res = await axios.patch(url, {data}, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    throw error;
  }
}


export const isLiked = async (id: string, data: string) => {
  try {
    const url =`${BASE_URL}/isLiked/${id}`;
     const res = await axios.patch(url, {data}, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const repost = async (id:string, userId: string, name: string) => {
  try {
    const url =`${BASE_URL}/repost/${id}`;
     const res = await axios.post(url, {userId, name}, {
        withCredentials: true,
      },);
    return res.data;
  } catch (error) {
    throw error;
  }
}