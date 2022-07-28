import { createAccount } from '../../../../services/create-account/create-account.services'
import { personalTrainerService } from '../../../../services/personal-trainer/personal-trainer.service'
import { tokenService } from '../../../../services/token-service/token.services'
import { CreatePTRequest, UpdatePTRequest } from '../../../../services/types'
import { userService } from '../../../../services/user/user.services'
import convertError from '../../../../utility/error-utility'

const onSubmit = (
  cerfImages: any,
  deletedCerfs: any,
  setToastSettings: any,
  updateUser: any,
) => async (values: any, actions: any) => {
  actions.setSubmitting(false)

  const birthday = new Date(
    parseInt(values.birthdayYear),
    parseInt(values.birthdayMonth) - 1,
    parseInt(values.birthdayDay),
  )

  const updatePTReq: UpdatePTRequest = {
    fullName: values.fullName,
    email: values.email,
    birthday: birthday,
    gender: values.gender,
    languages: values.languages,
    iban: values.iban,
    yearsOfExperience: parseInt(values.yearsOfExperience),
    gym: values.gym,
    deletedCerfImages: deletedCerfs.map((i) => i.split('/')[4]),
  }

  try {
    await userService.updatePTProfile(updatePTReq)

    if (values.profileImage) {
      await userService.updateProfileImage({
        profileImage: values.profileImage,
      })
    }

    if (cerfImages.filter((i) => i.file !== null).length !== 0) {
      await personalTrainerService.uploadCertificates(
        cerfImages.filter((i) => i.file !== null).map((i) => i.file),
      )
    }

    setToastSettings({
      text: 'Your profile has updated',
      show: true,
      className: 'bg-success',
    })
    updateUser()
  } catch (err) {
    if (err.response.data && err.response.data && err.response.data.details) {
      setToastSettings({
        text: "Some fields aren't valid",
        show: true,
        className: 'bg-warning',
      })

      if (err.response.data.details.length > 0) {
        const values = Object.values(err.response.data.details)

        values.forEach((value) => {
          const errorPoint = Object.values(value)[0]
          const splitted = errorPoint.split('.')
          actions.setErrors({
            [splitted[0]]: convertError(splitted[0], splitted[1]),
          })
        })
      } else {
        const { error_description } = err.response.data
        const splitted = error_description.split('.')
        actions.setErrors({
          [splitted[0]]: convertError(splitted[0], splitted[1]),
        })
      }

      return
    }
    setToastSettings({
      text: 'Unknown error has occured',
      show: true,
      className: 'bg-warning',
    })
  }
}

export default onSubmit
