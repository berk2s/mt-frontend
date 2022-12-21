import React, { useContext, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import EditProfileFormSchema from "./validation";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapForm from "react-bootstrap/Form";
import onSubmit from "./submit";
import { AppContext } from "../../../../App";
import FormElement from "../../../../components/form-element/form-element";
import MultiSelect from "../../../../components/multi-select/multi-select";
import {
  languageOptions,
  trainingDaysOptions,
} from "../../../../constants/constants";
import useRestCallEffect from "../../../../hooks/useRestCallEffect";
import { userService } from "../../../../services/user/user.services";
import apiConfig from "../../../../config/api.config";

interface EditProfileForm {
  fullName: string;
  email: string;
  birthdayDay: string;
  birthdayMonth: string;
  birthdayYear: string;
  gender: string;
  trainingDays: string[];
  trainingExperience: string;
  languages: string[];
  profileImage: any;
}

const EditProfileForm = () => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const { setToastSettings, updateUser } = useContext(AppContext);

  const [initialValues, setInitialValues] = useState<EditProfileForm>({
    fullName: "",
    email: "",
    birthdayDay: "",
    birthdayMonth: "",
    birthdayYear: "",
    gender: "MALE",
    trainingDays: [],
    trainingExperience: "BEGINNER",
    languages: [],
    profileImage: "",
  });

  useRestCallEffect(async () => {
    const athlete = await userService.getLoggedAthlete();

    const birthday = new Date(athlete.birthday ? athlete.birthday : null);

    setInitialValues({
      fullName: athlete.fullName ? athlete.fullName : "",
      email: athlete.email ? athlete.email : "",
      birthdayDay: birthday.getDate().toString(),
      birthdayMonth: (birthday.getMonth() + 1).toString(),
      birthdayYear: birthday.getFullYear().toString(),
      gender: athlete.gender ? athlete.gender : "",
      trainingDays: athlete.trainingDays ? athlete.trainingDays : [],
      trainingExperience: athlete.trainingExperience
        ? athlete.trainingExperience
        : "",
      languages: athlete.languages ? athlete.languages : [],
      profileImage: null,
    });

    if (athlete.imageUrl)
      setImagePreview(`${apiConfig.imageUrl}/${athlete.imageUrl}`);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={EditProfileFormSchema}
      onSubmit={onSubmit(setToastSettings, updateUser)}
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
              {imagePreview.trim() !== "" && (
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
                    selectedValues={languageOptions.filter((i) =>
                      initialValues.languages.includes(i.id)
                    )}
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
                    selectedValues={trainingDaysOptions.filter((i) =>
                      initialValues.trainingDays.includes(i.id)
                    )}
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
                  <span className="text-white">Save</span>
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default EditProfileForm;
