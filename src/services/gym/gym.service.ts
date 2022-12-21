import { clientJSON } from '../axios.services'
import { GymResponse } from '../types'

export const gymService = {
  getGyms,
}

async function getGyms(): Promise<GymResponse[]> {
  const gyms: GymResponse[] = await clientJSON.get('/gyms')

  return Promise.resolve(gyms)
}
