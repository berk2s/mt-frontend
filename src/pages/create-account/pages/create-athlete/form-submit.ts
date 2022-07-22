import { createAccount } from '../../../../services/create-account/create-account.services'
import { CreateAthleteRequest } from '../../../../services/create-account/create-account.types'
import { tokenService } from '../../../../services/token-service/token.services'
import { userService } from '../../../../services/user/user.services'
import convertError from '../../../../utility/error-utility'

const onSubmit = (setToastSettings: any) => async (
  values: any,
  actions: any,
) => {
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
    }
    const tokenResponse = await createAccount.createAthlete(createAthleteReq)

    tokenService.saveToken(tokenResponse.accessToken)
    const { userId } = tokenService.decode()

    const userResponse = await userService.updateProfileImage({
      userId,
      profileImage: values.profileImage,
    })

    console.log(userResponse)

    if (tokenResponse && tokenResponse.accessToken && tokenResponse.expiresIn) {
      setToastSettings({
        text: 'Yes! Welcome to Train Together.',
        show: true,
        className: 'bg-success',
      })
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
    } else {
    }

    setToastSettings({
      text: 'Unknown error has occured',
      show: true,
      className: 'bg-warning',
    })
  }
}

export default onSubmit
