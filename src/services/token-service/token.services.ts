import jwt_decode, { JwtPayload } from 'jwt-decode'

interface TokenPayload extends JwtPayload {
  userId: string
  fullName: string
}

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
  const token = getToken()
  const decoded = jwt_decode<TokenPayload>(token)

  return decoded
}
