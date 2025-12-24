import axios from 'axios'

const ENVIRONMENT = import.meta.env.VITE_KUMBULINK_ENV as string

export const http = axios.create({
  // TO-DO: add the env var in PROD to easily switch between environments
  baseURL: !!ENVIRONMENT && ENVIRONMENT === 'local' ? import.meta.env.VITE_KUMBULINK_URL as string : 'https://api.kumbulink.com/wp-json/',
  withCredentials: true
})

export default http
