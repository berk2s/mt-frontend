import React from "react";
import Stack from "react-bootstrap/Stack";
import EditPTProfileForm from "./form";

const EditPTProfile = () => {
  return (
    <Stack className="col-lg-8 mx-auto pt-5">
      <Stack className="mb-5">
        <h4 className="form-title text-center">Edit Profile</h4>
      </Stack>

      <EditPTProfileForm />
    </Stack>
  );
};

export default EditPTProfile;
