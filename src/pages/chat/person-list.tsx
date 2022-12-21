import React, { useEffect, useState } from "react";
import { ChatPerson } from "../../services/types";

interface PersonListProps {
  persons: ChatPerson[];
  clickHandler: (chatId: string, activeParticipant: ChatPerson) => void;
}

const PersonList = (props: PersonListProps) => {
  const { persons, clickHandler } = props;
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setActiveId(persons[0].id);
  }, [persons]);

  return (
    <div className="person-list">
      {persons.map((person, index) => {
        return (
          <div
            className={`chat-person ${
              activeId === person.id ? "active-chat-person" : ""
            }`}
            onClick={() => {
              setActiveId(person.id);
              clickHandler(person.chatId, person);
            }}
            key={index}
          >
            <div className="chat-person-img-wrapper">
              <img src={person.avatar} className="chat-person-img" />
            </div>

            <div className="chat-person-info-wrapper">
              <div className="name-area">
                <span className="person-name-text">{person.fullName}</span>
              </div>

              <div className="sub-area">
                <span className="sub-text">{person.subText}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PersonList;
