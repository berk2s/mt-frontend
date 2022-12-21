const errorMap = [
  {
    key: 'invalid',
    value: 'invalid',
  },
  {
    key: 'exists',
    value: 'exists',
  },
]

const convertError = (prefix: string, error: string): string => {
  const errorValue = errorMap.filter((i) => i.key === error)[0]

  return `${capitalizeFirstLetter(prefix)} ${errorValue.value}`
}

const capitalizeFirstLetter = (str: any): string => {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1)

  return capitalized
}

export default convertError
