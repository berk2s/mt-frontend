import React from "react";
import Stack from "react-bootstrap/esm/Stack";
import SuccessIcon from "../../components/icons/Success.component";

const SubscriptionSuccess = () => {
  return (
    <Stack className="col-lg-8 mx-auto pt-5">
      <Stack className="col-md-8 my-auto mx-auto page-wrapper package-list">
        <div className="mx-auto">
          <SuccessIcon />
        </div>

        <div className="mx-auto">
          <h2>You are now premium!</h2>
        </div>
      </Stack>
    </Stack>
  );
};

export default SubscriptionSuccess;
