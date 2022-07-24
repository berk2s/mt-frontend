import { userService } from '../../services/user/user.services'
import generateError from '../../utility/api-utility'

const onSubmit = (setToastSettings: any, setUserGym: any) => async (
  values: any,
  actions: any,
) => {
  actions.setSubmitting(false)

  try {
    const updateGym = await userService.updateGymPreference(values.selectedGym)

    if (updateGym && updateGym.id) {
      setToastSettings({
        text: 'Your GYM preference has been updated.',
        show: true,
        className: 'bg-success',
      })
      setUserGym(updateGym.gym)
    }
  } catch (err) {
    console.log(err)
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
