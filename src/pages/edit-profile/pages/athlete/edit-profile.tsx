import React from "react";
import Stack from "react-bootstrap/Stack";
import "./edit-profile.scss";
import EditProfileForm from "./form";

const EditProfile = () => {
  return (
    <Stack className="col-lg-8 mx-auto pt-5">
      <Stack className="mb-5">
        <h4 className="form-title text-center">Edit Profile</h4>
      </Stack>

      <EditProfileForm />
    </Stack>
  );
};

export default EditProfile;
