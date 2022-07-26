import React, { CSSProperties, useState } from "react";
import ClipLoader from "react-spinners/BounceLoader";
import { UserMeta } from "../../services/types";
import { capitalizeFirstLetter } from "../../utility/string-utility";
import NotFoundIcon from "../icons/notfound.component";
import "./discover-card.scss";

interface DiscoverCardProps {
  userMeta?: UserMeta;
  loading: boolean;
  interactionStatus: "NORMAL" | "LIKED" | "DISLIKED" | "MATCHED";
  interactionFetching: boolean;
}

const DiscoverCard = (props: DiscoverCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { userMeta, loading, interactionStatus, interactionFetching } = props;

  const renderMetaArray = (arr: string[], adj?: string): string => {
    const capitalized = arr.map((i) => capitalizeFirstLetter(i));

    if (adj && arr.length === 1) return `${adj} ${capitalized.join("")}`;

    return capitalized.join(", and ");
  };

  const interactionCSS = (
    interactionStatus: "NORMAL" | "LIKED" | "DISLIKED" | "MATCHED"
  ) => {
    switch (interactionStatus) {
      case "LIKED":
        return "liked-card";
      case "DISLIKED":
        return "disliked-card";
      case "MATCHED":
        return "matched-card";
      default:
        return "";
    }
  };

  return (
    <div className="person-card mx-auto">
      {!loading && (
        <>
          {userMeta ? (
            <>
              {interactionFetching && (
                <div className="card-loader">
                  <ClipLoader color={"#ef5b0c"} loading={true} size={50} />
                </div>
              )}

              <img
                src={userMeta.imageUrl}
                className="person-img"
                onClick={() => setShowDetails(!showDetails)}
              />

              <div
                className={`person-meta ${
                  showDetails && "expand-athlete-details"
                } ${
                  interactionStatus !== "NORMAL" && "interacted-card"
                } ${interactionCSS(interactionStatus)}`}
                onClick={() => setShowDetails(!showDetails)}
              >
                <span className="person-name">
                  {userMeta.name} • {userMeta.age}
                </span>
                <span className="person-meta-info">{userMeta.level}</span>

                <span
                  className={`person-meta-info ${
                    showDetails ? "show-it" : "hide-it"
                  }`}
                >
                  {renderMetaArray(userMeta.languages, "Only")}
                </span>
                <span
                  className={`person-meta-info ${
                    showDetails ? "show-it" : "hide-it"
                  }`}
                >
                  {renderMetaArray(userMeta.trainingDays)}
                </span>
              </div>
              {interactionStatus !== "NORMAL" && (
                <div className="discover-card-alert-wrapper">
                  <div
                    className={`interacted-alert ${interactionCSS(
                      interactionStatus
                    )}`}
                  >
                    <span className="interacted-alert-text">
                      {interactionStatus}
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="not-found-area">
                <NotFoundIcon color="#ef5b0c" width={80} height={80} />

                <span className="not-found-text">
                  Unfortunately, we couldn't find athletes by your criterias
                </span>
              </div>
            </>
          )}
        </>
      )}

      {loading && (
        <div className="card-loader">
          <ClipLoader color={"#ef5b0c"} loading={true} size={50} />
        </div>
      )}
    </div>
  );
};

export default DiscoverCard;
