import axios from 'axios'
import apiConfig from '../config/api.config'
import { tokenService } from './token-service/token.services'

const clientJSON = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenService.getToken()}`,
  },
})

clientJSON.interceptors.response.use((response) => {
  return response.data
})

const clientMultipart = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${tokenService.getToken()}`,
  },
})

clientMultipart.interceptors.response.use((response) => {
  return response.data
})

export { clientJSON, clientMultipart }
