import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { AppContext } from "../../App";
import LoginFormSchema from "./validation";
import FormElement from "../../components/form-element/form-element";
import Button from "react-bootstrap/Button";
import onSubmit from "./submit";

interface LoginFormValues {
  email: string;
  password: string;
}

const SignInForm = () => {
  const { setToastSettings, updateUser } = useContext(AppContext);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginFormSchema}
      onSubmit={onSubmit(setToastSettings, updateUser)}
    >
      {({ errors, touched, submitForm, isValid }) => (
        <Form>
          <FormElement
            showHelp={!!(errors.email && touched.email)}
            showHelpClassName={"invalid-feedback"}
            helpText={errors.email}
            className="mb-3"
            label="Email"
          >
            <Field
              id="email"
              name="email"
              className="form-control custom-input"
              placeholder="john.doe@email.com"
            />
          </FormElement>

          <FormElement
            showHelp={!!(errors.password && touched.password)}
            showHelpClassName={"invalid-feedback"}
            helpText={errors.password}
            className="mb-3"
            label="Password"
          >
            <Field
              type="password"
              id="password"
              name="password"
              className="form-control custom-input"
              placeholder="*******"
            />
          </FormElement>

          <div className="mt-4 mb-4">
            <Button
              onClick={() => {
                submitForm();
              }}
              variant="primary"
              className="w-100"
              disabled={!isValid}
            >
              <span className="text-white">Sign In</span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
