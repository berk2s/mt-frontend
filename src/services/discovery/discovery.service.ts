import { clientJSON } from '../axios.services'
import { AthleteResponse } from '../types'

export const discoveryService = {
  discovery,
}

async function discovery(): Promise<AthleteResponse[]> {
  const discovery: AthleteResponse[] = await clientJSON.get(`/discovery`)

  return Promise.resolve(discovery)
}
