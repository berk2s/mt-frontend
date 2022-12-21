import React from "react";
import { Navigate } from "react-router-dom";
import { tokenService } from "../services/token-service/token.services";

interface GuestRouteProps {
  children: React.PropsWithChildren<any>;
  redirectTo: string;
}

const GuestRoute = (props: GuestRouteProps) => {
  const { children, redirectTo } = props;
  const user = tokenService.decode();
  const token = tokenService.getToken();

  if (user && token != null) {
    window.location.href = redirectTo;
    return;
  }

  return children;
};

export default GuestRoute;
