import axios from 'axios'

export const privateBaseAxios = axios.create({
  baseURL: '/api',
})

export const privateBaseFetcher = (url: string) => privateBaseAxios.get(url)

export const governatorApiWithSessionCredentials =
  axios.create({
    baseURL: '/proxy',
    withCredentials: true ,
})

// governatorApiWithSessionCredentials.interceptors.response.use(response => {
//   return response;
// }, error => {
//  if (error.response.status === 401) {
//    return {
//     governatorId: '',
//     status: 401,
//     oauthProfile: {
//       discord_username: '',
//       discriminator: '',
//       _id: '',
//       avatar: '',
//       provider_id: '',
//     }
//   };
//  }
//  return error;
// });

export const governatorWCredentialsFetcher = (url: string) => governatorApiWithSessionCredentials.get(url)
