import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import useRestCallEffect from "../../hooks/useRestCallEffect";
import { gymService } from "../../services/gym/gym.service";
import { Formik, Form, Field } from "formik";
import ChangeGymFormSchema from "./validation";
import onSubmit from "./submit";
import FormElement from "../../components/form-element/form-element";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";
import { userService } from "../../services/user/user.services";

interface ChangeGymForm {
  selectedGym: string;
}

interface GymSelectInput {
  key: string;
  value: string;
}

const ChangeGymForm = () => {
  const [gyms, setGyms] = useState<GymSelectInput[]>([]);
  const [userGym, setUserGym] = useState<string>(null);
  const [isFetchingDone, setIsFetchingDone] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<ChangeGymForm>({
    selectedGym: "",
  });

  const { setToastSettings } = useContext(AppContext);

  useRestCallEffect(async () => {
    const gyms = await gymService.getGyms();
    const userInfo = await userService.getUserInfo();

    if (userInfo && userInfo.gym) {
      setInitialValues({
        selectedGym: userInfo.gym,
      });
      setUserGym(userInfo.gym);
    }
    setIsFetchingDone(true);

    setGyms([
      ...gyms.map((i) => {
        return {
          key: i.id,
          value: i.name,
        };
      }),
    ]);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ChangeGymFormSchema}
      enableReinitialize={true}
      onSubmit={onSubmit(setToastSettings, setUserGym)}
    >
      {({ errors, touched, isValid, submitForm, values }) => (
        <Form>
          {!userGym && isFetchingDone && (
            <Alert variant="alert-warn">You didn't select a gym yet.</Alert>
          )}
          <FormElement
            showHelp={!!(errors.selectedGym && touched.selectedGym)}
            showHelpClassName={"invalid-feedback"}
            helpText={errors.selectedGym}
            className="mb-3"
            label="The GYM that you are registered"
          >
            <Field
              component="select"
              name="selectedGym"
              as="select"
              className="form-select custom-select"
            >
              <option value="">Select a gym</option>
              {gyms.map((el, index) => {
                return (
                  <option value={el.key} key={index}>
                    {el.value}
                  </option>
                );
              })}
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
      )}
    </Formik>
  );
};

export default ChangeGymForm;
