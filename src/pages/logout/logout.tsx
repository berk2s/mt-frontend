import React, { useContext, useEffect } from "react";
import Stack from "react-bootstrap/esm/Stack";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { tokenService } from "../../services/token-service/token.services";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    tokenService.removeToken();

    setTimeout(() => {
      navigate("/", { replace: true });
      setUser(null);
    }, 2000);
  }, []);

  return (
    <Stack className="col-lg-8 mx-auto pt-5">
      <Stack className="mb-5">
        <h4 className="form-title text-center">Please wait...</h4>
      </Stack>
    </Stack>
  );
};

export default Logout;
