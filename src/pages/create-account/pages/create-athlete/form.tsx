import React, { useContext, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import RegisterFormSchema from "./form-validation";
import FormElement from "../../../../components/form-element/form-element";
import MultiSelect from "../../../../components/multi-select/multi-select";
import Button from "react-bootstrap/Button";
import { AppContext } from "../../../../App";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapForm from "react-bootstrap/Form";
import onSubmit from "./form-submit";
import {
  languageOptions,
  trainingDaysOptions,
} from "../../../../constants/constants";

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  birthdayDay: string;
  birthdayMonth: string;
  birthdayYear: string;
  gender: string;
  trainingDays: string[];
  trainingExperience: string;
  languages: string[];
  profileImage: any;
}

const RegisterForm = () => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const { setToastSettings, updateUser, lat, lng } = useContext(AppContext);

  const initialValues: RegisterFormValues = {
    fullName: "",
    email: "",
    password: "",
    birthdayDay: "",
    birthdayMonth: "",
    birthdayYear: "",
    gender: "MALE",
    trainingDays: [],
    trainingExperience: "BEGINNER",
    languages: [],
    profileImage: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterFormSchema}
      onSubmit={onSubmit(lat, lng, setToastSettings, updateUser)}
    >
      {({ errors, touched, setFieldValue, isValid, submitForm }) => (
        <Row>
          <Col lg={4}>
            <BootstrapForm.Label>Profile Photo</BootstrapForm.Label>

            <div
              className="avatar-upload"
              onClick={() => {
                fileInputRef.current.click();
              }}
            >
              {!errors.profileImage && imagePreview.trim() !== "" && (
                <img src={imagePreview} className="photo-preview" />
              )}
            </div>

            {errors.profileImage && (
              <BootstrapForm.Text className="invalid-feedback d-block">
                {errors.profileImage.toString()}
              </BootstrapForm.Text>
            )}

            <input
              ref={fileInputRef}
              type="file"
              className="profile-img-input"
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  let img = event.target.files[0];
                  setFieldValue("profileImage", img);

                  const blob = URL.createObjectURL(img);
                  setImagePreview(blob);
                }
              }}
            />
          </Col>
          <Col lg={8}>
            <Form>
              <FormElement
                showHelp={!!(errors.fullName && touched.fullName)}
                showHelpClassName={"invalid-feedback"}
                helpText={errors.fullName}
                className="mb-3"
                label="Full name"
              >
                <Field
                  id="fullName"
                  name="fullName"
                  className="form-control custom-input"
                  placeholder="Full Name"
                />
              </FormElement>

              <div className="row">
                <div className="col-2">
                  <FormElement
                    showHelp={!!(errors.birthdayDay && touched.birthdayDay)}
                    showHelpClassName={"invalid-feedback"}
                    helpText={errors.birthdayDay}
                    className="mb-3"
                    label="Day"
                  >
                    <Field
                      id="birthdayDay"
                      name="birthdayDay"
                      className="form-control custom-input"
                      placeholder="15"
                    />
                  </FormElement>
                </div>
                <div className="col-2">
                  <FormElement
                    showHelp={!!(errors.birthdayMonth && touched.birthdayMonth)}
                    showHelpClassName={"invalid-feedback"}
                    helpText={errors.birthdayMonth}
                    className="mb-3"
                    label="Month"
                  >
                    <Field
                      id="birthdayMonth"
                      name="birthdayMonth"
                      className="form-control custom-input"
                      placeholder="05"
                    />
                  </FormElement>
                </div>

                <div className="col-2">
                  <FormElement
                    showHelp={!!(errors.birthdayYear && touched.birthdayYear)}
                    showHelpClassName={"invalid-feedback"}
                    helpText={errors.birthdayYear}
                    className="mb-3"
                    label="Year"
                  >
                    <Field
                      id="birthdayYear"
                      name="birthdayYear"
                      className="form-control custom-input"
                      placeholder="1995"
                    />
                  </FormElement>
                </div>
              </div>

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
                  placeholder="Email"
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
                  placeholder="Password"
                />
              </FormElement>

              <FormElement
                showHelp={!!(errors.gender && touched.gender)}
                showHelpClassName={"invalid-feedback"}
                helpText={errors.gender}
                className="mb-3"
                label="Gender"
              >
                <Field
                  component="select"
                  name="gender"
                  as="select"
                  className="form-select custom-select"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </Field>
              </FormElement>

              <FormElement
                showHelp={!!errors.languages}
                showHelpClassName={"invalid-feedback"}
                helpText={errors.languages}
                className="mb-3"
                label="Languages"
              >
                <Field as="div" name="languages">
                  <MultiSelect
                    options={languageOptions}
                    onChange={(el) => {
                      setFieldValue(
                        "languages",
                        el.map((i) => i.id),
                        true
                      );
                    }}
                  />
                </Field>
              </FormElement>

              <FormElement
                showHelp={!!errors.trainingDays}
                showHelpClassName={"invalid-feedback"}
                helpText={errors.trainingDays}
                className="mb-3"
                label="Training Days"
              >
                <Field as="div" name="trainingDays">
                  <MultiSelect
                    options={trainingDaysOptions}
                    onChange={(el) => {
                      setFieldValue(
                        "trainingDays",
                        el.map((i) => i.id),
                        true
                      );
                    }}
                  />
                </Field>
              </FormElement>

              <FormElement
                showHelp={
                  !!(errors.trainingExperience && touched.trainingExperience)
                }
                showHelpClassName={"invalid-feedback"}
                helpText={errors.trainingExperience}
                className="mb-3"
                label="Training Experience"
              >
                <Field
                  component="select"
                  name="trainingExperience"
                  as="select"
                  className="form-select custom-select"
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </Field>
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
                  <span className="text-white">Sign Up</span>
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default RegisterForm;
