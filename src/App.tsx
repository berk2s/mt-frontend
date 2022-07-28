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
import ChatList from "./pages/chat/chat-list";
import PremiumPackages from "./pages/premium-packages/premium";
import SubscriptionSuccess from "./pages/success/subscription-success";
import CreatePersonalTrainerAccount from "./pages/create-account/pages/create-pt/create-pt";
import EditPTProfile from "./pages/edit-profile/pages/personal-trainer/edit-profile";
import MyPackages from "./pages/my-packages/my-packages";
import CreatePackage from "./pages/create-package/create-package";
import EditPackage from "./pages/edit-package/edit-package";
import PersonalTrainers from "./pages/personal-trainers/personal-trainers";
import PTDetail from "./pages/personal-trainers/detail";

export const AppContext = createContext(null);

function App() {
  const [toastSettings, setToastSettings] = useState({
    show: false,
    className: "",
    text: "",
  });

  const [user, setUser] = useState<TokenPayload>(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

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
    updateUser();

    getLocation();
  }, []);

  useEffect(() => {
    if (!lat || !lng) return;

    const updateLoc = async () => {
      await userService.updateLocation({
        lat: lat,
        lng: lng,
      });
    };

    updateLoc();
  }, [lat, lng]);

  useEffect(() => {
    if (!user) return;

    getLocation();
  }, [user]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(parseFloat(position.coords.latitude + "").toFixed(6));
          setLng(parseFloat(position.coords.longitude + "").toFixed(6));
        },
        () => {
          console.log("Unable to get the location");
          getLocation();
        }
      );
    }
  };

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
      value={{ setToastSettings, user, setUser, updateUser, lng, lat }}
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
              path="create-account/personal-trainer"
              element={
                <GuestRoute redirectTo="/discover">
                  <CreatePersonalTrainerAccount />
                </GuestRoute>
              }
            />
            <Route
              path="discover"
              element={
                <ProtectedRoute canSee={["ATHLETE"]} redirectTo="/sign-in">
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
              path="pt-profile"
              element={
                <ProtectedRoute canSee={["PT"]} redirectTo="/sign-in">
                  <EditPTProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="change-gym"
              element={
                <ProtectedRoute
                  canSee={["ATHLETE", "PT"]}
                  redirectTo="/sign-in"
                >
                  <ChangeGym />
                </ProtectedRoute>
              }
            />

            <Route
              path="chat"
              element={
                <ProtectedRoute
                  canSee={["ATHLETE", "PT"]}
                  redirectTo="/sign-in"
                >
                  <ChatList />
                </ProtectedRoute>
              }
            />

            <Route
              path="go-premium"
              element={
                <ProtectedRoute
                  canSee={["ATHLETE", "PT"]}
                  redirectTo="/sign-in"
                >
                  <PremiumPackages />
                </ProtectedRoute>
              }
            />

            <Route
              path="subscription"
              element={
                <ProtectedRoute canSee={["ATHLETE"]} redirectTo="/sign-in">
                  <SubscriptionSuccess />
                </ProtectedRoute>
              }
            />

            <Route
              path="my-packages"
              element={
                <ProtectedRoute canSee={["PT"]} redirectTo="/sign-in">
                  <MyPackages />
                </ProtectedRoute>
              }
            />

            <Route
              path="create-package"
              element={
                <ProtectedRoute canSee={["PT"]} redirectTo="/sign-in">
                  <CreatePackage />
                </ProtectedRoute>
              }
            />

            <Route
              path="edit-package/:packageId"
              element={
                <ProtectedRoute canSee={["PT"]} redirectTo="/sign-in">
                  <EditPackage />
                </ProtectedRoute>
              }
            />

            <Route
              path="personal-trainers"
              element={
                <ProtectedRoute canSee={["ATHLETE"]} redirectTo="/sign-in">
                  <PersonalTrainers />
                </ProtectedRoute>
              }
            />

            <Route
              path="personal-trainers/:personalTrainerId"
              element={
                <ProtectedRoute canSee={["ATHLETE"]} redirectTo="/sign-in">
                  <PTDetail />
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
