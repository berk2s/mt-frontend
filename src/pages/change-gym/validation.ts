import * as Yup from 'yup'

const ChangeGymFormSchema = Yup.object().shape({
  selectedGym: Yup.string().required('Please select a gym'),
})

export default ChangeGymFormSchema
