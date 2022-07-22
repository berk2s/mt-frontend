import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CreateAccount from "./pages/create-account/create-account.component";
import Home from "./pages/home/home.component";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CreateAthleteAccount from "./pages/create-account/pages/create-athlete/create-athlete";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";

export const AppContext = createContext(null);

function App() {
  const [toastSettings, setToastSettings] = useState({
    show: false,
    className: "",
    text: "",
  });

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

  return (
    <AppContext.Provider value={{ setToastSettings }}>
      <div className="App">
        <Navbar className="navbar">
          <Container>
            <Navbar.Brand className="brand-name">
              <Link to="/" className="nav-link">
                Train(Together
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Link to="/create-account" className="nav-link">
                Create Account
              </Link>
            </Nav>
          </Container>
        </Navbar>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route
              path="create-account/athlete"
              element={<CreateAthleteAccount />}
            />
          </Routes>
        </Container>

        <div
          aria-live="polite"
          aria-atomic="true"
          className="bg-dark position-relative"
          style={{ minHeight: "100px" }}
        >
          <ToastContainer position={"bottom-end"}>
            <Toast
              show={toastSettings.show}
              className={`d-inline-block m-1 ${toastSettings.className}`}
            >
              <Toast.Body>{toastSettings.text}</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
