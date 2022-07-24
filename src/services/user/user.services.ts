import { clientJSON, clientMultipart } from '../axios.services'
import { tokenService } from '../token-service/token.services'
import { AthleteResponse, UpdateAthleteRequest, UserResponse } from '../types'
import { UpdateProfileImage } from './user-services.types'

export const userService = {
  updateProfileImage,
  getLoggedAthlete,
  updateAthleteProfile,
}

async function updateProfileImage(
  updateProfileImage: UpdateProfileImage,
): Promise<UserResponse> {
  const formData = new FormData()
  formData.append('profileImage', updateProfileImage.profileImage)

  const updateUser: UserResponse = await clientMultipart.put(
    `/users/avatar`,
    formData,
    {
      headers: {
        Authorization: 'Bearer ' + tokenService.getToken(),
      },
    },
  )
  return updateUser
}

async function getLoggedAthlete(): Promise<AthleteResponse> {
  const athlete: AthleteResponse = await clientJSON.get(`/users/athletes/me`)

  return Promise.resolve(athlete)
}

async function updateAthleteProfile(req: UpdateAthleteRequest) {
  const athlete: AthleteResponse = await clientJSON.put(
    '/users/athletes',
    JSON.stringify(req),
  )

  return Promise.resolve(athlete)
}
