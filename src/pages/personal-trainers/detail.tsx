import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "react-spinners/BounceLoader";
import { AppContext } from "../../App";
import apiConfig from "../../config/api.config";
import useRestCallEffect from "../../hooks/useRestCallEffect";
import { personalTrainerService } from "../../services/personal-trainer/personal-trainer.service";
import { subscriptionService } from "../../services/subscription/subscription.service";
import { PTPackageResponse, PTResponse } from "../../services/types";
import { calculateAge } from "../../utility/date-utility";
import { capitalizeFirstLetter } from "../../utility/string-utility";

const PTDetail = () => {
  const navigate = useNavigate();
  const { personalTrainerId } = useParams();
  const { setToastSettings } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [pt, setPT] = useState<PTResponse>();
  const [packages, setPackages] = useState<PTPackageResponse[]>([]);

  useRestCallEffect(async () => {
    const personalTrainer = await personalTrainerService.getPTInfoById(
      personalTrainerId
    );

    setPT(personalTrainer);

    const packages =
      await personalTrainerService.getPackagesByPersonalTrainerId(
        personalTrainerId
      );

    setPackages(packages);

    setIsLoading(false);
  }, []);

  const handleBuyClick = (foreginRef: string) => async (e) => {
    try {
      const paymentLink = await subscriptionService.subscribe({
        foreginRef: foreginRef,
      });

      window.location.replace(paymentLink.sessionUrl);
    } catch (err) {
      if (err.response.data.error_description === "user.subscribedBefore") {
        setToastSettings({
          text: "You've already subscribed this package",
          show: true,
          className: "bg-warning",
        });
      }
    }
  };

  return (
    <Stack className="col-lg-8 mx-auto pt-5 page-wrapper">
      <div className="mb-5 mx-auto">
        <h4 className="form-title text-center">
          {isLoading ? "Loading..." : pt.fullName}
        </h4>
      </div>

      {isLoading && (
        <div className="loader">
          <Loader color={"#ef5b0c"} loading={true} size={50} />
        </div>
      )}

      <Row>
        <Col lg={4}>
          {!isLoading && (
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 32,
              }}
              key={pt.id}
              onClick={() => navigate(`/personal-trainers/${pt.id}`)}
            >
              <div className="person-card mx-auto">
                <img
                  src={`${apiConfig.imageUrl}/${pt.imageUrl}`}
                  className="person-img"
                  // onClick={() => setShowDetails(!showDetails)}
                />

                <div className={"person-meta"} style={{ maxHeight: 90 }}>
                  <span className="person-name">
                    {pt.fullName} • {calculateAge(new Date(pt.birthday))}
                  </span>
                  <span className="person-meta-info">
                    {pt.yearsOfExperience} years experience
                  </span>
                  <span className="person-meta-info">
                    {pt.languages
                      .map((i) => capitalizeFirstLetter(i))
                      .join(", and ")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Col>

        <Col lg={8}>
          <h5 style={{ fontSize: 16 }}>My Packages</h5>

          <div
            className="package-list mt-3"
            style={{ gap: 20, marginBottom: 100 }}
          >
            {packages.map((_package, index) => {
              return (
                <section key={index}>
                  <div className="product">
                    <div className="description">
                      <h3>{_package.packageName}</h3>

                      <h5>{_package.packageDescription}</h5>

                      <h5>{_package.workoutType.join(",")} workout types</h5>

                      <h5>
                        €{_package.price} / {_package.period}
                      </h5>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      id="checkout-and-portal-button"
                      type="submit"
                      style={{
                        borderBottomLeftRadius: 0,
                      }}
                      onClick={handleBuyClick(_package.foreginRef)}
                    >
                      Buy
                    </button>
                  </div>
                </section>
              );
            })}
          </div>
        </Col>
      </Row>
    </Stack>
  );
};

export default PTDetail;
