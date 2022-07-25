import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/BounceLoader";
import { UserMeta } from "../../services/types";
import NotFoundIcon from "../icons/notfound.component";
import "./discover-card.scss";

interface DiscoverCardProps {
  userMeta?: UserMeta;
  loading: boolean;
}

const DiscoverCard = (props: DiscoverCardProps) => {
  const { userMeta, loading } = props;
  return (
    <div className="person-card mx-auto">
      {!loading && (
        <>
          {userMeta ? (
            <>
              <img src={userMeta.imageUrl} className="person-img" />

              <div className="person-meta">
                <span className="person-name">
                  {userMeta.name} • {userMeta.age}
                </span>
                <span className="person-level">{userMeta.level}</span>
              </div>
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
