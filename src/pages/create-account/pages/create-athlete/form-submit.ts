import { createAccount } from '../../../../services/create-account/create-account.services'
import { tokenService } from '../../../../services/token-service/token.services'
import { CreateAthleteRequest } from '../../../../services/types'
import { userService } from '../../../../services/user/user.services'
import convertError from '../../../../utility/error-utility'

const onSubmit = (
  lat: number,
  lng: number,
  setToastSettings: any,
  updateUser: any,
) => async (values: any, actions: any) => {
  actions.setSubmitting(false)

  const birthday = new Date(
    parseInt(values.birthdayYear),
    parseInt(values.birthdayMonth) - 1,
    parseInt(values.birthdayDay),
  )

  try {
    const createAthleteReq: CreateAthleteRequest = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      birthday: birthday,
      gender: values.gender,
      trainingDays: values.trainingDays,
      trainingExperience: values.trainingExperience,
      languages: values.languages,
      lat: lat ? lat : 0.0,
      lng: lng ? lng : 0.0,
    }

    const tokenResponse = await createAccount.createAthlete(createAthleteReq)

    await tokenService.saveToken(tokenResponse.accessToken)

    await userService.updateProfileImage({
      profileImage: values.profileImage,
    })

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
