import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import MessageIcon from "../../components/icons/message.component";
import "./chat-list.scss";
import ChatMessages from "./chat-messages";
import PersonList from "./person-list";
import Loader from "react-spinners/BounceLoader";
import useRestCallEffect from "../../hooks/useRestCallEffect";
import { chatService } from "../../services/chat/chat.service";
import { ChatPerson } from "../../services/types";
import { AppContext } from "../../App";
import apiConfig from "../../config/api.config";
import { datePrettier } from "../../utility/date-utility";

const ChatList = () => {
  const { user } = useContext(AppContext);

  const [isInitialFetching, setIsInitialFetching] = useState(true);
  const [chatPersons, setChatPersons] = useState<ChatPerson[]>([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeParticipant, setActiveParticipant] = useState<ChatPerson>();
  const [_chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useRestCallEffect(async () => {
    if (!user) return;

    setTimeout(async () => {
      const chats = await chatService.myChats();

      chats.forEach((chat) => {
        const person = getParticipant(chat.participants);

        setChatPersons((_chatPersons) => [
          ..._chatPersons,
          {
            id: person._id,
            fullName: person.fullName,
            avatar: `${apiConfig.imageUrl}/${person.imageUrl}`,
            subText: `${datePrettier(new Date(chat.createdAt))}`,
            chatId: chat.chatId,
            matchingId: chat.matchingId,
          },
        ]);
      });

      setIsInitialFetching(false);

      setChats(chats);

      if (chats.length === 0) return;

      const { chatId, participants } = chats[0];

      setActiveChatId(chatId);
      setActiveChat(chats[0]);
      setActiveParticipant(getParticipant(participants, chats[0].matchingId));
    }, 2000);
  }, [user]);

  const getParticipant = (participants: any, matchingId?: any) => {
    const personArr = participants.filter((i) => i._id !== user.userId);

    if (personArr.length === 0) return;

    return {
      ...personArr[0],
      matchingId: matchingId,
    };
  };

  const handlePersonClicked = async (
    chatId: string,
    activeParticipant: ChatPerson
  ) => {
    setActiveChatId(chatId);
    setActiveParticipant(activeParticipant);
  };

  useEffect(() => {
    setActiveChat(_chats.filter((i) => i.chatId === activeChatId)[0]);
  }, [activeChatId]);

  return (
    <Stack className="col-lg-8 pt-5 mx-auto page-wrapper">
      <div className="mb-5 mx-auto">
        <h4 className="form-title text-center">Chat List</h4>
      </div>

      {isInitialFetching ? (
        <div className="loader">
          <Loader color={"#ef5b0c"} loading={true} size={50} />
        </div>
      ) : !activeChatId ? (
        <div className="no-message-area">
          <MessageIcon color={"#36AE7C"} width={36} height={36} />
          <span className="no-message-text">
            You haven't chatted with anybody yet
          </span>
        </div>
      ) : (
        <Row>
          <Col lg={4}>
            <PersonList
              persons={chatPersons}
              clickHandler={handlePersonClicked}
            />
          </Col>
          <Col lg={8}>
            <ChatMessages
              chatId={activeChatId}
              participant={activeParticipant}
              activeChat={activeChat}
            />
          </Col>
        </Row>
      )}
    </Stack>
  );
};

export default ChatList;
