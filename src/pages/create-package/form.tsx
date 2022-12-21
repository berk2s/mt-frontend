import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { AppContext } from "../../App";
import CreatePackageValidation from "./validation";
import onSubmit from "./submit";
import FormElement from "../../components/form-element/form-element";
import { workoutTypes } from "../../constants/constants";
import MultiSelect from "../../components/multi-select/multi-select";
import Button from "react-bootstrap/esm/Button";

interface CreatePackageForm {
  packageName: string;
  packageDescription: string;
  unitAmount: number;
  workoutType: string[];
}

const CreatePackageForm = () => {
  const { setToastSettings } = useContext(AppContext);

  const initialValues: CreatePackageForm = {
    packageName: "",
    packageDescription: "",
    unitAmount: 0,
    workoutType: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreatePackageValidation}
      enableReinitialize={true}
      onSubmit={onSubmit(setToastSettings)}
    >
      {({ errors, touched, isValid, submitForm, setFieldValue }) => (
        <>
          <FormElement
            showHelp={!!(errors.packageName && touched.packageName)}
            showHelpClassName={"invalid-feedback"}
            helpText={errors.packageName}
            className="mb-3"
            label="Package name"
          >
            <Field
              type="text"
              id="packageName"
              name="packageName"
              className="form-control custom-input"
              placeholder="Super package"
            />
          </FormElement>

          <FormElement
            showHelp={
              !!(errors.packageDescription && touched.packageDescription)
            }
            showHelpClassName={"invalid-feedback"}
            helpText={errors.packageDescription}
            className="mb-3"
            label="Package description"
          >
            <Field
              type="text"
              as="textarea"
              style={{ height: 160 }}
              id="packageDescription"
              name="packageDescription"
              className="form-control custom-input"
              placeholder="What a amazing package it is!"
            />
          </FormElement>

          <FormElement
            showHelp={!!(errors.unitAmount && touched.unitAmount)}
            showHelpClassName={"invalid-feedback"}
            helpText={errors.unitAmount}
            className="mb-3"
            label="Price"
          >
            <Field
              type="text"
              id="unitAmount"
              name="unitAmount"
              className="form-control custom-input"
              placeholder="1"
            />
          </FormElement>

          <FormElement
            showHelp={!!errors.workoutType}
            showHelpClassName={"invalid-feedback"}
            helpText={errors.workoutType}
            className="mb-3"
            label="Workout types"
          >
            <Field as="div" name="languages">
              <MultiSelect
                options={workoutTypes}
                onChange={(el) => {
                  setFieldValue(
                    "workoutType",
                    el.map((i) => i.id),
                    true
                  );
                }}
              />
            </Field>
          </FormElement>

          <div className="mt-1 mb-4">
            <Button
              onClick={() => {
                submitForm();
              }}
              variant="primary"
              className="w-100"
              disabled={!isValid}
            >
              <span className="text-white">Create</span>
            </Button>
          </div>
        </>
      )}
    </Formik>
  );
};

export default CreatePackageForm;
