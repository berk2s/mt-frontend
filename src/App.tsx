import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CreateAccount from "./pages/create-account/create-account.component";
import Home from "./pages/home/home.component";
import Container from "react-bootstrap/Container";
import CreateAthleteAccount from "./pages/create-account/pages/create-athlete/create-athlete";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";
import SignIn from "./pages/sign-in/sign-in";
import ProtectedRoute from "./guard/protected-route";
import Discover from "./pages/discover/discover";
import GuestRoute from "./guard/guest-route";
import Header from "./components/header/header.component";
import { tokenService } from "./services/token-service/token.services";
import { TokenPayload } from "./services/types";
import EditProfile from "./pages/edit-profile/pages/athlete/edit-profile";
import Logout from "./pages/logout/logout";
import { userService } from "./services/user/user.services";
import ChangeGym from "./pages/change-gym/change-gym";

export const AppContext = createContext(null);

function App() {
  const [toastSettings, setToastSettings] = useState({
    show: false,
    className: "",
    text: "",
  });

  const [user, setUser] = useState<TokenPayload>(null);

  useEffect(() => {
    if (toastSettings.show) {
      setTimeout(() => {
        setToastSettings({
          show: false,
          className: "",
          text: "",
        });
      }, 5000);
    }
  }, [toastSettings.show]);

  useEffect(() => {
    const decoded = tokenService.decode();

    if (decoded) {
      setUser(decoded);
    }
  }, []);

  const updateUser = (obj?: TokenPayload) => {
    if (obj) {
      setUser({
        ...user,
        ...obj,
      });
      return;
    }

    const decoded = tokenService.decode();

    setUser(decoded);
  };

  return (
    <AppContext.Provider
      value={{ setToastSettings, user, setUser, updateUser }}
    >
      <div className="App">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="sign-in"
              element={
                <GuestRoute redirectTo="/discover">
                  <SignIn />
                </GuestRoute>
              }
            />
            <Route
              path="create-account"
              element={
                <GuestRoute redirectTo="/discover">
                  <CreateAccount />
                </GuestRoute>
              }
            />
            <Route
              path="create-account/athlete"
              element={
                <GuestRoute redirectTo="/discover">
                  <CreateAthleteAccount />
                </GuestRoute>
              }
            />
            <Route
              path="discover"
              element={
                <ProtectedRoute
                  canSee={["PT", "ATHLETE"]}
                  redirectTo="/sign-in"
                >
                  <Discover />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute canSee={["ATHLETE"]} redirectTo="/sign-in">
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="change-gym"
              element={
                <ProtectedRoute canSee={["ATHLETE"]} redirectTo="/sign-in">
                  <ChangeGym />
                </ProtectedRoute>
              }
            />

            <Route
              path="logout"
              element={
                <ProtectedRoute
                  canSee={["PT", "ATHLETE"]}
                  redirectTo="/sign-in"
                >
                  <Logout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>

        <ToastContainer position={"bottom-end"}>
          <Toast
            show={toastSettings.show}
            className={`d-inline-block m-1 ${toastSettings.className}`}
          >
            <Toast.Body className="toast-text">{toastSettings.text}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </AppContext.Provider>
  );
}

export default App;
