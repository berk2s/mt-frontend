import { clientJSON } from '..//axios.services'
import { CreateAthleteRequest, TokenResponse } from '../types'

export const createAccount = {
  createAthlete,
}

async function createAthlete(
  body: CreateAthleteRequest,
): Promise<TokenResponse> {
  const createAthlhete: TokenResponse = await clientJSON.post(
    '/users/athletes',
    JSON.stringify(body),
  )

  return createAthlhete
}
