import axios from 'axios'
export const privateBaseAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? ''
      : 'http://localhost:4000/governator',
})

export const discordAxios = (accessToken: string) =>
  axios.create({
    baseURL: 'https://discord.com/api',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${accessToken}`,
    },
  })

export const discordFetcher = (url: string, accessToken: string) =>
  discordAxios(accessToken).get(url)

export const privateBaseFetcher = (url: string) => privateBaseAxios.get(url)
