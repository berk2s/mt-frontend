import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import Loader from "react-spinners/BounceLoader";
import NotFoundIcon from "../../components/icons/notfound.component";
import apiConfig from "../../config/api.config";
import useRestCallEffect from "../../hooks/useRestCallEffect";
import { personalTrainerService } from "../../services/personal-trainer/personal-trainer.service";
import { PTResponse } from "../../services/types";
import { calculateAge } from "../../utility/date-utility";
import { capitalizeFirstLetter } from "../../utility/string-utility";

const PersonalTrainers = () => {
  const [personalTrainers, setPersonalTrainers] = useState<PTResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const navigate = useNavigate();

  useRestCallEffect(async () => {
    try {
      const personalTrainers =
        await personalTrainerService.getAllPersonalTrainers();

      setPersonalTrainers(personalTrainers);
      setIsLoading(false);
    } catch (err) {
      if (err.response.data.error_description === "athlete.unsubscribed") {
        setIsLoading(false);
        setIsUnsubscribed(true);
      }
    }
  }, []);

  return (
    <Stack className="col-lg-9 mx-auto pt-5 page-wrapper">
      <div className="mb-5 mx-auto">
        <h4 className="form-title text-center">Personal Trainers</h4>
      </div>

      {isLoading && (
        <div className="loader">
          <Loader color={"#ef5b0c"} loading={true} size={50} />
        </div>
      )}

      {isUnsubscribed && (
        <div className="no-message-area">
          <NotFoundIcon color={"#ef5b0c"} width={80} height={80} />
          <span className="no-message-text mt-3">
            Only subscribed athletes may see personal trainers
          </span>
        </div>
      )}

      {!isLoading && !isUnsubscribed && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          {personalTrainers.map((pt) => {
            return (
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
            );
          })}
        </div>
      )}
    </Stack>
  );
};

export default PersonalTrainers;
