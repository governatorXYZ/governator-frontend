import axios from 'axios'
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

export const privateBaseAxios = axios.create({
  baseURL: '/api'
})

export const privateBaseFetcher = (url: string) => privateBaseAxios.get(url)

export const governatorApiWithSessionCredentials =
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_GOVERNATOR_API_ENDPOINT,
    withCredentials: true ,
})

governatorApiWithSessionCredentials.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
   return {
    governatorId: '',
    status: 401,
    oauthProfile: {
      discord_username: '',
      discriminator: '',
      _id: '',
      avatar: '',
      provider_id: '',
    }
  };
 }
 return error;
});