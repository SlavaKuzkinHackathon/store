import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_API_BASEURL}`,
})

export default instance
