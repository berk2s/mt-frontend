import React from "react";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapForm from "react-bootstrap/Form";
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
