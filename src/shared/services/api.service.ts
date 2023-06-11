import axios from 'axios'

const apiService = axios.create({
  baseURL: 'https://podcasters.spotify.com/',
})

export default apiService
