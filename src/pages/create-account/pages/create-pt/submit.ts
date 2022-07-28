import { createAccount } from '../../../../services/create-account/create-account.services'
import { personalTrainerService } from '../../../../services/personal-trainer/personal-trainer.service'
import { tokenService } from '../../../../services/token-service/token.services'
import { CreatePTRequest } from '../../../../services/types'
import { userService } from '../../../../services/user/user.services'
import convertError from '../../../../utility/error-utility'

const onSubmit = (
  cerfImages: any,
  setToastSettings: any,
  updateUser: any,
) => async (values: any, actions: any) => {
  actions.setSubmitting(false)

  const birthday = new Date(
    parseInt(values.birthdayYear),
    parseInt(values.birthdayMonth) - 1,
    parseInt(values.birthdayDay),
  )

  const createPT: CreatePTRequest = {
    fullName: values.fullName,
    email: values.email,
    password: values.password,
    birthday: birthday,
    gender: values.gender,
    languages: values.languages,
    iban: values.iban,
    yearsOfExperience: parseInt(values.yearsOfExperience),
    gym: values.gym,
  }

  try {
    const tokenResponse = await createAccount.createPersonalTrainer(createPT)

    await tokenService.saveToken(tokenResponse.accessToken)

    await userService.updateProfileImage({
      profileImage: values.profileImage,
    })

    await personalTrainerService.uploadCertificates(
      cerfImages.map((i) => i.file),
    )

    if (tokenResponse && tokenResponse.accessToken && tokenResponse.expiresIn) {
      setToastSettings({
        text: 'Yes! Welcome to Train Together.',
        show: true,
        className: 'bg-success',
      })
      updateUser()
    }
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
