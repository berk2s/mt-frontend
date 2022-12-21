import React from "react";
import Stack from "react-bootstrap/esm/Stack";
import ChangeGymForm from "./form";

const ChangeGym = () => {
  return (
    <Stack className="col-lg-8 mx-auto pt-5">
      <Stack className="mb-5">
        <h4 className="form-title text-center">Change GYM</h4>
      </Stack>

      <Stack className="col-md-5 mx-auto">
        <ChangeGymForm />
      </Stack>
    </Stack>
  );
};

export default ChangeGym;
