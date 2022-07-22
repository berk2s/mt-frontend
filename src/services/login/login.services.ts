import { clientJSON } from '../axios.services'
import { TokenResponse } from '../types'
import { LoginRequest } from './login-services.types'

export const loginService = {
  authenticate,
}

async function authenticate(loginReq: LoginRequest): Promise<TokenResponse> {
  const loginResponse: TokenResponse = await clientJSON.post(
    '/authenticate',
    JSON.stringify(loginReq),
  )

  return loginResponse
}
