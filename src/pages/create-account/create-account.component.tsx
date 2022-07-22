import Stack from "react-bootstrap/Stack";
import "./create-account.scss";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <Stack className="col-lg-8 mx-auto pt-5 page-wrapper">
      <Stack className="mb-5">
        <h4 className="form-title text-center">Create Account</h4>
      </Stack>

      <div className="d-md-flex flex-md-equal w-100 ps-md-3">
        <Link
          to="/create-account/personal-trainer"
          className="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden box-wrapper"
        >
          <div className="my-3 py-3">
            <h2 className="display-5">Personal Trainer</h2>
            <p className="lead">Are you a personal trainer?</p>
          </div>
          <div className="bg-light shadow-sm mx-auto box-style"></div>
        </Link>
        <Link
          to="/create-account/athlete"
          className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden box-wrapper"
        >
          <div className="my-3 p-3">
            <h2 className="display-5">Athlete</h2>
            <p className="lead">Are you looking for a fitness buddy?</p>
          </div>
          <div className="bg-dark shadow-sm mx-auto box-style"></div>
        </Link>
      </div>
    </Stack>
  );
};

export default CreateAccount;
