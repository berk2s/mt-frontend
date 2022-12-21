import jwt_decode from 'jwt-decode'
import { TokenPayload } from '../types'

export const tokenService = {
  saveToken,
  getToken,
  removeToken,
  decode,
}

async function saveToken(token: string): Promise<void> {
  localStorage.setItem('accessToken', token)
}

function getToken() {
  return localStorage.getItem('accessToken')
}

function removeToken() {
  localStorage.removeItem('accessToken')
}

function decode() {
  try {
    const token = getToken()
    const decoded = jwt_decode<TokenPayload>(token)

    return decoded
  } catch (e) {
    return null
  }
}
