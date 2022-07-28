import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import RegisterFormSchema from "./validation";
import Row from "react-bootstrap/esm/Row";
import BootstrapForm from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import { Button } from "react-bootstrap";
import FormElement from "../../../../components/form-element/form-element";
import MultiSelect from "../../../../components/multi-select/multi-select";
import { languageOptions } from "../../../../constants/constants";
import useRestCallEffect from "../../../../hooks/useRestCallEffect";
import { gymService } from "../../../../services/gym/gym.service";
import { GymResponse } from "../../../../services/types";
import onSubmit from "./submit";
import { AppContext } from "../../../../App";

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  birthdayDay: string;
  birthdayMonth: string;
  birthdayYear: string;
  gender: string;
  languages: string[];
  profileImage: any;
  cerfImages: any[];
  iban: string;
  gym: string;
  yearsOfExperience: number;
}

const RegisterForm = () => {
  const { setToastSettings, updateUser } = useContext(AppContext);

  const fileInputRef = useRef(null);
  const certificateInputRef = useRef(null);
  const formikRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const [cerfImagePreviews, setCerfImagePreviews] = useState([]);
  const [cerfFiles, setCerfFiles] = useState([]);
  const [gyms, setGyms] = useState([]);

  const initialValues: RegisterFormValues = {
    fullName: "",
    email: "",
    password: "",
    birthdayDay: "",
    birthdayMonth: "",
    birthdayYear: "",
    gender: "MALE",
    languages: [],
    profileImage: "",
    iban: "",
    gym: "",
    yearsOfExperience: 1,
    cerfImages: [],
  };

  useRestCallEffect(async () => {
    const gyms: GymResponse[] = await gymService.getGyms();

    setGyms(
      gyms.map((i) => {
        return {
          id: i.id,
          name: i.name,
        };
      })
    );
  }, []);

  const addCerfBtnHandler = () => {
    certificateInputRef.current.click();
  };

  const removeImage = (id: any) => (event: any) => {
    setCerfImagePreviews([...cerfImagePreviews.filter((i) => i !== id)]);

    setCerfFiles(cerfFiles.filter((i) => i.id !== id));

    formikRef.current.setFieldValue(
      "cerfImages",
      [...cerfFiles.filter((i) => i.id !== id)],
      true
    );
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={RegisterFormSchema}
      enableReinitialize={true}
      onSubmit={onSubmit(cerfFiles, setToastSettings, updateUser)}
    >
      {({ values, errors, touched, setFieldValue, isValid, submitForm }) => (
        <Row>
          <Col lg={4}>
            <Row>
              <Col lg={12}>
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

              <Col lg={12} className="mt-4">
                <BootstrapForm.Label>Certificate Images</BootstrapForm.Label>
                {errors.cerfImages && (
                  <BootstrapForm.Text className="invalid-feedback d-block">
                    {errors.cerfImages.toString()}
                  </BootstrapForm.Text>
                )}
                <div>
                  <Button
                    variant="light"
                    style={{
                      height: 35,
                      fontSize: 14,
                    }}
                    onClick={addCerfBtnHandler}
                  >
                    Add
                  </Button>

                  <input
                    ref={certificateInputRef}
                    type="file"
                    multiple
                    className="profile-img-input"
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0]) {
                        const files = event.target.files;

                        for (let i = 0; i < files.length; ++i) {
                          const img = files[i];
                          const id = Math.random();

                          setFieldValue(
                            "cerfImages",
                            [...values.cerfImages, img],
                            true
                          );

                          if (errors.cerfImages) return;

                          const blob = URL.createObjectURL(img);

                          setCerfFiles([
                            ...cerfFiles,
                            {
                              id: id,
                              file: img,
                              blob: blob,
                            },
                          ]);
                          event.target.value = null;
                        }
                      }
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    flexDirection: "column",
                    width: "fit-content",
                    gap: 16,
                  }}
                >
                  {cerfFiles.map((file, index) => {
                    return (
                      <div
                        key={file.id}
                        style={{ width: "fit-content", position: "relative" }}
                      >
                        <img
                          src={file.blob}
                          style={{
                            width: 130,
                            height: 175,
                          }}
                        />

                        <div
                          style={{
                            position: "absolute",
                            top: -10,
                            right: -9,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "25px",
                            height: "25px",
                            backgroundColor: "#ddd",
                            borderRadius: "10px",
                            color: "#af4c4c",
                            cursor: "pointer",
                            fontSize: 12,
                          }}
                          onClick={removeImage(file.id)}
                        >
                          x
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg={8}>
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
              showHelp={!!errors.gym}
              showHelpClassName={"invalid-feedback"}
              helpText={errors.gym}
              className="mb-3"
              label="Gym"
            >
              <Field
                component="select"
                name="gym"
                as="select"
                className="form-select custom-select"
              >
                {gyms.map((gym) => {
                  return <option value={gym.id}>{gym.name}</option>;
                })}
              </Field>
            </FormElement>

            <FormElement
              showHelp={
                !!(errors.yearsOfExperience && errors.yearsOfExperience)
              }
              showHelpClassName={"invalid-feedback"}
              helpText={errors.yearsOfExperience}
              className="mb-3"
              label="Years of experience"
            >
              <Field
                type="yearsOfExperience"
                id="yearsOfExperience"
                name="yearsOfExperience"
                className="form-control custom-input"
                placeholder="1"
              />
            </FormElement>

            <FormElement
              showHelp={!!(errors.iban && errors.iban)}
              showHelpClassName={"invalid-feedback"}
              helpText={errors.iban}
              className="mb-3"
              label="IBAN"
            >
              <Field
                type="iban"
                id="iban"
                name="iban"
                className="form-control custom-input"
                placeholder="DE75512108001245126199"
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
                <span className="text-white">Sign Up</span>
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default RegisterForm;
