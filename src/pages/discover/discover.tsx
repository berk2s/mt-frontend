import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import DiscoverCard from "../../components/discover-card/discover-card.component";
import DislikeIcon from "../../components/icons/dislike.component";
import LikeIcon from "../../components/icons/like.component";
import apiConfig from "../../config/api.config";
import useRestCallEffect from "../../hooks/useRestCallEffect";
import { discoveryService } from "../../services/discovery/discovery.service";
import { UserMeta, UserResponse } from "../../services/types";
import { calculateAge } from "../../utility/date-utility";
import { capitalizeFirstLetter } from "../../utility/string-utility";
import "./discover.scss";

const Discover = () => {
  const [currUser, setCurrUser] = useState<UserMeta>(null);
  const [nextUser, setNextUser] = useState<UserMeta>(null);
  const [isFetching, setIsFetching] = useState(false);

  useRestCallEffect(async () => {
    const athletes = await discoverAtheletes();

    setCurrUser(athleteToMetaData(athletes[0]));
    setNextUser(athleteToMetaData(athletes[1]));
  }, []);

  const discoverAtheletes = async () => {
    setIsFetching(true);
    const athletes = await discoveryService.discovery();

    setTimeout(async () => {
      setIsFetching(false);
    }, 2000);

    return athletes;
  };

  const dislikeHandle = () => {
    setCurrUser(nextUser);
  };

  const likeHandle = () => {
    setCurrUser(nextUser);
  };

  const athleteToMetaData = (athlete: UserResponse) => {
    return {
      imageUrl: `${apiConfig.imageUrl}/${athlete.imageUrl}`,
      name: athlete.fullName,
      age: calculateAge(new Date(athlete.birthday)).toString(),
      level: capitalizeFirstLetter(athlete.trainingExperience),
    };
  };

  return (
    <Stack className="col-lg-8 pt-5 mx-auto page-wrapper">
      <div className="mb-5 mx-auto">
        <h4 className="form-title text-center">Discover buddies</h4>
      </div>
      <div className="col-md-5 mx-auto">
        <DiscoverCard userMeta={currUser} loading={isFetching} />

        <Stack className="action-area mx-auto mt-4">
          <div className="action-btn-wrapper" onClick={dislikeHandle}>
            <DislikeIcon color={"#F94C66"} width={16} height={16} />
          </div>
          <div className="action-btn-wrapper" onClick={likeHandle}>
            <LikeIcon color={"#3CCF4E"} width={16} height={16} />
          </div>
        </Stack>
      </div>
    </Stack>
  );
};

export default Discover;
