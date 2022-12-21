import * as Yup from 'yup'

const CreatePackageValidation = Yup.object().shape({
  packageName: Yup.string().required('Required'),
  packageDescription: Yup.string().required('Required'),
  unitAmount: Yup.number()
    .typeError('Please enter valid price')
    .required('Required'),
  workoutType: Yup.array().required('Required'),
})

export default CreatePackageValidation
