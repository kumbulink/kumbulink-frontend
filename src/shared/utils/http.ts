import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://api.kumbulink.com/wp-json/',
  withCredentials: true
})

export default http
