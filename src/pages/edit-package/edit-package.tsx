import React from "react";
import Stack from "react-bootstrap/Stack";
import Loader from "react-spinners/BounceLoader";
import EditPackageForm from "./form";

const EditPackage = () => {
  return (
    <Stack className="col-lg-5 mx-auto pt-5 page-wrapper">
      <div className="mb-5 mx-auto">
        <h4 className="form-title text-center">Edit Package</h4>
      </div>

      <EditPackageForm />
    </Stack>
  );
};

export default EditPackage;
