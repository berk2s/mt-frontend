import convertError from './error-utility'

const generateError = (err: any, actions: any, setToastSettings: any) => {
  setToastSettings({
    text: 'Please check your inputs',
    show: true,
    className: 'bg-warning',
  })

  if (err.response.data.details.length > 0) {
    const values = Object.values(err.response.data.details)

    values.forEach((value) => {
      const errorPoint = Object.values(value)[0]
      const splitted = errorPoint.split('.')
      setActionError(actions, splitted)
    })
  } else {
    const { error_description } = err.response.data
    const splitted = error_description.split('.')
    setActionError(actions, splitted)
  }
}

const setActionError = (actions: any, splitted: any) => {
  actions.setErrors({
    [splitted[0]]: convertError(splitted[0], splitted[1]),
  })
}

export default generateError
