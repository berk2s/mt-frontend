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
import {
  AthleteResponse,
  DiscoveryQueryParams,
  UserMeta,
} from "../../services/types";
import { ageToBirthday, calculateAge } from "../../utility/date-utility";
import { capitalizeFirstLetter } from "../../utility/string-utility";
import "./discover.scss";
import FilterDiscover from "./filter-dicover";

type InteractionStatus = "NORMAL" | "LIKED" | "DISLIKED" | "MATCHED";

const Discover = () => {
  const { setToastSettings } = useContext(AppContext);

  const navigate = useNavigate();

  const [currUser, setCurrUser] = useState<UserMeta>(null);
  const [athletes, setAthletes] = useState<AthleteResponse[]>([]);

  const [currIndex, setCurrIndex] = useState(0);

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

    if (athletes[currIndex])
      setCurrUser(athleteToMetaData(athletes[currIndex]));

    setInteractionStatus("NORMAL");
    setInteracted(false);
  }, [athletes, currIndex]);

  const discoverAtheletes = async (_queryParams?: DiscoveryQueryParams) => {
    setIsFetching(true);

    let queryParams;
    let birthDayStart;
    let birthDayEnd;

    if (!_queryParams) {
      birthDayStart = ageToBirthday(18);
      birthDayEnd = ageToBirthday(50);
      queryParams = `birthDate>${birthDayEnd}&birthDate<${birthDayStart}`;
    } else {
      queryParams = await generateParams({
        ..._queryParams,
        birthdayStart: null,
        birthdayEnd: null,
      });

      birthDayStart = ageToBirthday(parseInt(_queryParams.birthdayStart));
      birthDayEnd = ageToBirthday(parseInt(_queryParams.birthdayEnd));

      queryParams = `birthDate>${birthDayEnd}&birthDate<${birthDayStart}${queryParams}`;
    }

    const athletesResponse = await discoveryService.discovery(queryParams);

    setTimeout(async () => {
      setIsFetching(false);
      setAthletes(athletesResponse);
    }, 2000);

    return athletes;
  };

  const generateParams = async (
    _queryParams: DiscoveryQueryParams
  ): Promise<string> => {
    let query = "";
    for (const [key, value] of Object.entries(_queryParams)) {
      if (!value) continue;

      if (Array.isArray(value) && value.length == 0) continue;

      if (!Array.isArray(value)) {
        query = query.concat("&", `${key}=${value}`);
      } else {
        query = query.concat("&", `${key}=${value.join(",")}`);
      }
    }

    return Promise.resolve(query);
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

  const onFilter = async (values: any, actions: any) => {
    const queryParams = {
      location: values.location,
      birthdayStart: values.age[0],
      birthdayEnd: values.age[1],
      gym: values.gyms,
      sex: values.genders,
      languages: values.languages,
      trainingDays: values.workoutDays,
      trainingExperience: values.experiences,
    };

    await discoverAtheletes(queryParams);
  };

  return (
    <Stack className="col-lg-12 pt-5 mx-auto ">
      <div className="mb-5 mx-auto">
        <h4 className="form-title text-center">Discover buddies</h4>
      </div>

      <div className="row">
        <div className="col-md-3">
          <FilterDiscover onSubmit={onFilter} />
        </div>

        <div className="col-md-6">
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
      </div>
    </Stack>
  );
};

export default Discover;
