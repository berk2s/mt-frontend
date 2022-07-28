import { personalTrainerService } from '../../services/personal-trainer/personal-trainer.service'
import { CreatePackageRequest } from '../../services/types'
import { userService } from '../../services/user/user.services'
import generateError from '../../utility/api-utility'

const onSubmit = (setToastSettings: any) => async (
  values: any,
  actions: any,
) => {
  actions.setSubmitting(false)

  const req: CreatePackageRequest = {
    packageName: values.packageName,
    packageDescription: values.packageDescription,
    workoutType: values.workoutType,
    unitAmonut: parseInt(values.unitAmount),
    currency: 'eur',
    subscriptionInterval: 'month',
  }

  try {
    await personalTrainerService.createPackage(req)

    setToastSettings({
      text: 'The package has created',
      show: true,
      className: 'bg-success',
    })
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
