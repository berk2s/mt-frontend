import { clientJSON } from '../axios.services'
import { UserResponse } from '../types'

export const discoveryService = {
  discovery,
}

async function discovery(): Promise<UserResponse[]> {
  const discovery: UserResponse[] = await clientJSON.get(`/discovery`)

  return Promise.resolve(discovery)
}
