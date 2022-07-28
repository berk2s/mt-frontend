import { clientJSON } from '..//axios.services'
import { CreateAthleteRequest, CreatePTRequest, TokenResponse } from '../types'

export const createAccount = {
  createAthlete,
  createPersonalTrainer,
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

async function createPersonalTrainer(
  body: CreatePTRequest,
): Promise<TokenResponse> {
  const createPT: TokenResponse = await clientJSON.post(
    '/users/personal-trainers',
    JSON.stringify(body),
  )

  return createPT
}
