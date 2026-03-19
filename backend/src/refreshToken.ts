import { UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

export const refreshIdToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    return {
      idToken: response.data.id_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
    };
  } catch (err: any) {
    console.error('Failed to refresh token', err.response?.data || err.message);
    throw new UnauthorizedException('Cannot refresh token');
  }
};