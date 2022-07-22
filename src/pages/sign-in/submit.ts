import { loginService } from '../../services/login/login.services'
import { tokenService } from '../../services/token-service/token.services'

const onSubmit = (setToastSettings: any) => async (
  values: any,
  actions: any,
) => {
  try {
    const { email, password } = values

    const tokenResponse = await loginService.authenticate({
      email: email,
      password: password,
    })

    const { accessToken } = tokenResponse

    tokenService.saveToken(accessToken)

    setToastSettings({
      text: "You're successfully logged in",
      show: true,
      className: 'bg-success',
    })
  } catch (err) {
    if (err.response.data) {
      setToastSettings({
        text: 'Email or password invalid',
        show: true,
        className: 'bg-warning',
      })
      return
    }

    setToastSettings({
      text: 'Something went wrong',
      show: true,
      className: 'bg-warning',
    })
  }
}

export default onSubmit
