import { personalTrainerService } from '../../services/personal-trainer/personal-trainer.service'
import { UpdatePackageRequest } from '../../services/types'
import generateError from '../../utility/api-utility'

const onSubmit = (packageId: string, setToastSettings: any) => async (
  values: any,
  actions: any,
) => {
  actions.setSubmitting(false)

  const req: UpdatePackageRequest = {
    packageName: values.packageName,
    packageDescription: values.packageDescription,
    workoutType: values.workoutType,
    unitAmonut: parseInt(values.unitAmount),
    currency: 'eur',
    subscriptionInterval: 'month',
  }

  try {
    await personalTrainerService.updatePTPackage(packageId, req)

    setToastSettings({
      text: 'The package has updated',
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
