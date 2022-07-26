import React, { useContext, useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import DiscoverCard from "../../components/discover-card/discover-card.component";
import DislikeIcon from "../../components/icons/dislike.component";
import LikeIcon from "../../components/icons/like.component";
import apiConfig from "../../config/api.config";
import useRestCallEffect from "../../hooks/useRestCallEffect";
import { discoveryService } from "../../services/discovery/discovery.service";
import { interactionService } from "../../services/interaction/interaction.service";
import { AthleteResponse, UserMeta, UserResponse } from "../../services/types";
import { calculateAge } from "../../utility/date-utility";
import { capitalizeFirstLetter } from "../../utility/string-utility";
import "./discover.scss";

type InteractionStatus = "NORMAL" | "LIKED" | "DISLIKED" | "MATCHED";

const Discover = () => {
  const { setToastSettings } = useContext(AppContext);

  const navigate = useNavigate();

  const [currUser, setCurrUser] = useState<UserMeta>(null);
  const [athletes, setAthletes] = useState<AthleteResponse[]>([]);

  const [currIndex, setCurrIndex] = useState(null);

  const [currInteractionStatus, setInteractionStatus] =
    useState<InteractionStatus>("NORMAL");
  const [isFetching, setIsFetching] = useState(false);
  const [isInteractionFetching, setIsInteractionFetching] = useState(false);

  const [interacted, setInteracted] = useState(false);

  useRestCallEffect(async () => {
    await discoverAtheletes();
  }, []);

  useEffect(() => {
    if (athletes.length === 0) {
      setCurrUser(null);
      return;
    }

    setCurrIndex(0);
  }, [athletes]);

  useEffect(() => {
    if (currIndex == null) return;

    setCurrUser(athleteToMetaData(athletes[currIndex]));
    setInteractionStatus("NORMAL");
    setInteracted(false);
  }, [currIndex]);

  const discoverAtheletes = async () => {
    setIsFetching(true);

    const athletesResponse = await discoveryService.discovery();

    setTimeout(async () => {
      setIsFetching(false);
      setAthletes(athletesResponse);
    }, 2000);

    return athletes;
  };

  const likeHandle = async () => {
    try {
      setInteracted(true);

      if (interacted) return;

      setIsInteractionFetching(true);

      const likeResponse = await interactionService.like(currUser.id);

      setIsInteractionFetching(false);

      if (likeResponse && likeResponse.matching) {
        setInteractionStatus("MATCHED");
        return;
      }

      setTimeout(async () => {
        contiuneDiscovery();
      }, 1500);

      setInteractionStatus("LIKED");
    } catch (err) {
      setToastSettings({
        text: "Unknown error has occured",
        show: true,
        className: "bg-warning",
      });
    }
  };

  const dislikeHandle = async () => {
    try {
      setInteracted(true);

      if (interacted) return;

      setIsInteractionFetching(true);

      await interactionService.dislike(currUser.id);

      setIsInteractionFetching(false);

      setTimeout(async () => {
        contiuneDiscovery();
      }, 1500);

      setInteractionStatus("DISLIKED");
    } catch (err) {
      setToastSettings({
        text: "Unknown error has occured",
        show: true,
        className: "bg-warning",
      });
    }
  };

  const contiuneDiscovery = async () => {
    if (typeof athletes[currIndex + 1] === "undefined") {
      await discoverAtheletes();
    } else {
      setCurrIndex(currIndex + 1);
    }
  };

  const athleteToMetaData = (athlete: AthleteResponse) => {
    return {
      id: athlete.id,
      imageUrl: `${apiConfig.imageUrl}/${athlete.imageUrl}`,
      name: athlete.fullName,
      age: calculateAge(new Date(athlete.birthday)).toString(),
      level: capitalizeFirstLetter(athlete.trainingExperience),
      languages: athlete.languages,
      trainingDays: athlete.trainingDays,
    };
  };

  return (
    <Stack className="col-lg-8 pt-5 mx-auto page-wrapper">
      <div className="mb-5 mx-auto">
        <h4 className="form-title text-center">Discover buddies</h4>
      </div>
      <div className="col-md-5 mx-auto">
        <div className="discover-card-area">
          <DiscoverCard
            userMeta={currUser}
            loading={isFetching}
            interactionFetching={isInteractionFetching}
            interactionStatus={currInteractionStatus}
          />
        </div>

        {currInteractionStatus === "MATCHED" && (
          <div className="mx-auto">
            <div className="matching-action-area">
              <div
                className="matched-btn negative-btn"
                onClick={contiuneDiscovery}
              >
                <span>Continue</span>
              </div>
              <div className="matched-btn" onClick={() => navigate("/chat")}>
                <span>Start chatting</span>
              </div>
            </div>
          </div>
        )}

        {currInteractionStatus !== "MATCHED" && (
          <Stack className="discover-action-area mx-auto mt-4">
            <div className="action-btn-wrapper" onClick={dislikeHandle}>
              <DislikeIcon color={"#F94C66"} width={16} height={16} />
            </div>
            <div className="action-btn-wrapper" onClick={likeHandle}>
              <LikeIcon color={"#3CCF4E"} width={16} height={16} />
            </div>
          </Stack>
        )}
      </div>
    </Stack>
  );
};

export default Discover;
