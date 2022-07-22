import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import SignInForm from "./form";

const SignIn = () => {
  return (
    <Stack className="col-lg-8 pt-5 mx-auto page-wrapper">
      <div className="mb-5 mx-auto">
        <h4 className="form-title text-center">Sign In</h4>
      </div>
      <Stack className="col-md-5 mx-auto">
        <SignInForm />
      </Stack>
    </Stack>
  );
};

export default SignIn;
