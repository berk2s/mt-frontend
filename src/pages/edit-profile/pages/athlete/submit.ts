import { UpdateAthleteRequest } from '../../../../services/types'
import { userService } from '../../../../services/user/user.services'
import generateError from '../../../../utility/api-utility'

const onSubmit = (setToastSettings: any, updateUser: any) => async (
  values: any,
  actions: any,
) => {
  actions.setSubmitting(false)

  const birthday = new Date(
    parseInt(values.birthdayYear),
    parseInt(values.birthdayMonth) - 1,
    parseInt(values.birthdayDay),
  )

  const updateAthleteReq: UpdateAthleteRequest = {
    fullName: values.fullName,
    email: values.email,
    birthday: birthday,
    gender: values.gender,
    trainingDays: values.trainingDays,
    trainingExperience: values.trainingExperience,
    languages: values.languages,
  }

  try {
    const updateResponse = await userService.updateAthleteProfile(
      updateAthleteReq,
    )

    if (values.profileImage) {
      await userService.updateProfileImage({
        profileImage: values.profileImage,
      })
    }

    if (updateResponse && updateResponse.id) {
      setToastSettings({
        text: 'Your profile has been updated.',
        show: true,
        className: 'bg-success',
      })
      updateUser({
        fullName: updateResponse.fullName,
      })
    }
  } catch (err) {
    if (err.response.data && err.response.data && err.response.data.details) {
      generateError(err, actions, setToastSettings)
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
