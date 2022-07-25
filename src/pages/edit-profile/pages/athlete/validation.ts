import * as Yup from 'yup'

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const EditProfileFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(1, 'Your name is too short')
    .max(100, 'Your name is too long')
    .required('Your name is required'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required'),
  birthdayDay: Yup.number()
    .min(1, 'Invalid')
    .max(31, 'Invalid')
    .required('Required'),
  birthdayMonth: Yup.number()
    .min(1, 'Invalid')
    .max(12, 'Invalid')
    .required('Required'),
  birthdayYear: Yup.number()
    .min(1950, 'Invalid')
    .max(2022, 'Invalid')
    .required('Required'),
  gender: Yup.string().required('Your gender is required'),
  languages: Yup.array().min(1, 'Languages are required'),
  trainingDays: Yup.array().min(1, 'Training days are required'),
  trainingExperience: Yup.string().required('Tranining experience is required'),
  profileImage: Yup.mixed()
    .test('mimeType', 'Only jpeg and png files', (value) => {
      if (value) {
        return SUPPORTED_FORMATS.includes(value.type)
      }

      return true
    })
    .test('fileSize', 'The file is too large', (value) => {
      if (!value) return true

      return value != undefined && value && value.size <= 2000000
    }),
})

export default EditProfileFormSchema
