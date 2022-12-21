import * as Yup from "yup";

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default LoginFormSchema;
