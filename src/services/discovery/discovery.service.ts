import { clientJSON } from '../axios.services'
import { AthleteResponse } from '../types'

export const discoveryService = {
  discovery,
}

async function discovery(queryParams: string): Promise<AthleteResponse[]> {
  const discovery: AthleteResponse[] = await clientJSON.get(
    `/discovery?` + queryParams,
  )

  return Promise.resolve(discovery)
}
