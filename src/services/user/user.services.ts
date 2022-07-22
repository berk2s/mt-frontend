import { clientMultipart } from '../axios.services'
import { UserResponse } from '../types'
import { UpdateProfileImage } from './user-services.types'

export const userService = {
  updateProfileImage,
}

async function updateProfileImage(
  updateProfileImage: UpdateProfileImage,
): Promise<UserResponse> {
  const formData = new FormData()
  formData.append('profileImage', updateProfileImage.profileImage)

  const updateUser: UserResponse = await clientMultipart.put(
    `/user/avatar/${updateProfileImage.userId}`,
    formData,
  )
  return updateUser
}
