import { clientJSON } from '..//axios.services'
import { TokenResponse } from '../types'
import { CreateAthleteRequest } from './create-account.types'

export const createAccount = {
  createAthlete,
}

async function createAthlete(
  body: CreateAthleteRequest,
): Promise<TokenResponse> {
  const createAthlhete: TokenResponse = await clientJSON.post(
    '/user/athlete',
    JSON.stringify(body),
  )

  return createAthlhete
}
