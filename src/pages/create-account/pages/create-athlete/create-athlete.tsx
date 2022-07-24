import React from "react";
import Stack from "react-bootstrap/Stack";
import RegisterForm from "./form";
import "./create-athlete.scss";

const CreateAthleteAccount = () => {
  return (
    <Stack className="col-lg-8 mx-auto pt-5">
      <Stack className="mb-5">
        <h4 className="form-title text-center">Create Account</h4>
      </Stack>

      <RegisterForm />
    </Stack>
  );
};

export default CreateAthleteAccount;
