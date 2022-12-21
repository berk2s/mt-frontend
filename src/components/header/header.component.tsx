import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import "./header.scss";

const Header = () => {
  const { user } = useContext(AppContext);

  const renderGuest = () => {
    return (
      <>
        <Link to="/create-account" className="nav-link">
          Create Account
        </Link>

        <Link to="/sign-in" className="nav-link">
          Sign In
        </Link>
      </>
    );
  };

  const renderLogged = () => {
    switch (user.userType) {
      case "ATHLETE":
        return renderAthlete();
      case "PT":
        return renderPT();
    }
  };

  const renderAthlete = () => {
    return (
      <>
        <Link to="/discover" className="nav-link">
          Discover Buddies
        </Link>

        <Link to="/personal-trainers" className="nav-link">
          Personal Trainers
        </Link>

        <NavDropdown
          title={`${user.fullName} ${
            user.isPremium === true ? "(Premium)" : ""
          }`}
          id="basic-nav-dropdown"
        >
          <span className="dropdown-item">
            <Link to="/profile" className="nav-link dropdown-link">
              Profile
            </Link>
          </span>

          <span className="dropdown-item">
            <Link to="/chat" className="nav-link dropdown-link">
              Chat
            </Link>
          </span>

          <span className="dropdown-item">
            <Link to="/change-gym" className="nav-link dropdown-link">
              Change GYM
            </Link>
          </span>
          {user.isPremium === false && (
            <span className="dropdown-item">
              <Link to="/go-premium" className="nav-link dropdown-link">
                Go Premium
              </Link>
            </span>
          )}

          <NavDropdown.Divider />

          <span className="dropdown-item">
            <Link to="/logout" className="nav-link dropdown-link">
              Logout
            </Link>
          </span>
        </NavDropdown>
      </>
    );
  };

  const renderPT = () => {
    return (
      <>
        <Link to="/my-packages" className="nav-link">
          My packages
        </Link>

        <NavDropdown
          title={`${user.fullName} ${
            user.isPremium === true ? "(Premium)" : ""
          }`}
          id="basic-nav-dropdown"
        >
          <span className="dropdown-item">
            <Link to="/pt-profile" className="nav-link dropdown-link">
              Profile
            </Link>
          </span>

          <span className="dropdown-item">
            <Link to="/chat" className="nav-link dropdown-link">
              Chat
            </Link>
          </span>

          <span className="dropdown-item">
            <Link to="/change-gym" className="nav-link dropdown-link">
              Change GYM
            </Link>
          </span>

          <NavDropdown.Divider />

          <span className="dropdown-item">
            <Link to="/logout" className="nav-link dropdown-link">
              Logout
            </Link>
          </span>
        </NavDropdown>
      </>
    );
  };

  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand className="brand-name">
          <Link to="/" className="nav-link">
            Train(Together
          </Link>
        </Navbar.Brand>

        <Nav className="justify-content-end">
          {user ? renderLogged() : renderGuest()}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
