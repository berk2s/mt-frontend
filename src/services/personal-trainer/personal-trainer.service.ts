import { clientMultipart } from '../axios.services'
import { tokenService } from '../token-service/token.services'

export const personalTrainerService = {
  uploadCertificates,
}

async function uploadCertificates(images: any[]) {
  const formData = new FormData()
  images.forEach((image) => {
    formData.append('certificates', image)
  })

  const updatePT = await clientMultipart.put(
    `users/personal-trainers/certificates`,
    formData,
    {
      headers: {
        Authorization: 'Bearer ' + tokenService.getToken(),
      },
    },
  )

  return updatePT
}
