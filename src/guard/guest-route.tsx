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

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default GuestRoute;
