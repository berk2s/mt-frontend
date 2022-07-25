import { clientJSON } from '../axios.services'
import { MatchingResponse } from '../types'

export const matchingService = {
  unmatch,
}

async function unmatch(matchingId: string): Promise<MatchingResponse> {
  const unmatchResponse: MatchingResponse = await clientJSON.put(
    `/users/athletes/matching/${matchingId}/unlink`,
  )

  return unmatchResponse
}
