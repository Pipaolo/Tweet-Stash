import axios, { AxiosInstance } from 'axios'

export const twitterAxios = axios.create({
  baseURL: process.env.TWITTER_URL,
})
