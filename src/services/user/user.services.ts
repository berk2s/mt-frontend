import { clientJSON, clientMultipart } from '../axios.services'
import { tokenService } from '../token-service/token.services'
import {
  AthleteResponse,
  UpdateAthleteRequest,
  UpdateGeoLocationRequest,
  UserResponse,
} from '../types'
import { UpdateProfileImage } from './user-services.types'

export const userService = {
  updateProfileImage,
  getLoggedAthlete,
  updateAthleteProfile,
  updateGymPreference,
  getUserInfo,
  updateLocation,
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

async function getUserInfo(): Promise<UserResponse> {
  const userInfo: UserResponse = await clientJSON.get('/users/me')

  return Promise.resolve(userInfo)
}

async function updateAthleteProfile(req: UpdateAthleteRequest) {
  const athlete: AthleteResponse = await clientJSON.put(
    '/users/athletes',
    JSON.stringify(req),
  )

  return Promise.resolve(athlete)
}

async function updateGymPreference(gymId: string): Promise<UserResponse> {
  const updateGym: UserResponse = await clientJSON.put(`/users/gyms/${gymId}`)

  return Promise.resolve(updateGym)
}

async function updateLocation(
  req: UpdateGeoLocationRequest,
): Promise<AthleteResponse> {
  const updateLocationRes: AthleteResponse = await clientJSON.put(
    `/users/athletes/geolocation`,
    JSON.stringify(req),
  )

  return Promise.resolve(updateLocationRes)
}
