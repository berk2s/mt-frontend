import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import DislikeIcon from "../../components/icons/dislike.component";
import LikeIcon from "../../components/icons/like.component";
import "./discover.scss";

interface UserMeta {
  imageUrl: string;
  name: string;
  age: string;
  level: string;
}

const Discover = () => {
  const [currUser, setCurrUser] = useState<UserMeta>({
    imageUrl: "https://i.pravatar.cc/330",
    name: "Berek Negerek",
    age: "23",
    level: "Intermediate",
  });

  useEffect(() => {
    if (!currUser) {
      setCurrUser({
        imageUrl: "https://i.pravatar.cc/350",
        name: "John Doe",
        age: "28",
        level: "Beginner",
      });
    }
  }, []);

  const renderSwipeContent = (userMeta: UserMeta) => {
    const { name, imageUrl, age, level } = userMeta;
    const img = userMeta.imageUrl;
    return (
      <div className="person-card mx-auto">
        <img src={img} className="person-img" />

        <div className="person-meta">
          <span className="person-name">
            {userMeta.name} • {userMeta.age}
          </span>
          <span className="person-level">{userMeta.level}</span>
        </div>
      </div>
    );
  };

  const dislikeHandle = () => {
    setCurrUser({
      imageUrl: "https://i.pravatar.cc/350",
      name: "John Doxe",
      age: "28",
      level: "Beginner",
    });
  };

  const likeHandle = () => {
    setCurrUser({
      imageUrl: "https://i.pravatar.cc/350",
      name: "John2 Doe",
      age: "28",
      level: "Beginner",
    });
  };

  return (
    <Stack className="col-lg-8 pt-5 mx-auto page-wrapper">
      <div className="mb-5 mx-auto">
        <h4 className="form-title text-center">Discover buddies</h4>
      </div>
      <div className="col-md-5 mx-auto">
        {renderSwipeContent(currUser)}

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
