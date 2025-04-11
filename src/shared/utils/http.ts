import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.kumbulink.com/wp-json/',
  withCredentials: true
})

export default http
