import axios from 'axios'


export const http = axios.create({
  baseURL: 'https://api.kumbulink.com/wp-json/',
  // TO-DO: add the env var in PROD to easily switch between environments
  // baseURL: import.meta.env.VITE_KUMBULINK_URL as string, // uncomment this to run it locally
  withCredentials: true
})

export default http
