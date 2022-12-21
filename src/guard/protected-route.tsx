import React from "react";
import { Navigate } from "react-router-dom";
import { tokenService } from "../services/token-service/token.services";
import { UserCanSee } from "./protected-route.types";

interface ProtectedRouteProps {
  children: React.PropsWithChildren<any>;
  canSee: UserCanSee[];
  redirectTo: string;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { children, canSee, redirectTo } = props;

  let _redirectTo = redirectTo;

  try {
    const user = tokenService.decode();

    if (user.userType === "PT") _redirectTo = "/my-packages";

    if (!user || canSee.filter((i) => i === user.userType).length == 0) {
      return <Navigate to={_redirectTo} replace />;
    }

    return children;
  } catch (e) {
    return <Navigate to={redirectTo} replace />;
  }
};

export default ProtectedRoute;
