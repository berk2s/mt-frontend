import React from "react";
import Stack from "react-bootstrap/Stack";
import CreatePackageForm from "./form";

const CreatePackage = () => {
  return (
    <Stack className="col-lg-5 mx-auto pt-5 page-wrapper">
      <div className="mb-5 mx-auto">
        <h4 className="form-title text-center">Create a Package</h4>
      </div>

      <CreatePackageForm />
    </Stack>
  );
};

export default CreatePackage;
