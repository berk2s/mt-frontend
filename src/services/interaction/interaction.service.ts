import { clientJSON } from '../axios.services'
import { InteractionResponse } from '../types'

export const interactionService = {
  like,
  dislike,
}

async function like(athleteId: string) {
  const interaction: InteractionResponse = await clientJSON.post(
    `/users/athletes/likes/${athleteId}`,
  )

  return interaction
}

async function dislike(athleteId: string) {
  const interaction: InteractionResponse = await clientJSON.post(
    `/users/athletes/dislikes/${athleteId}`,
  )

  return interaction
}
