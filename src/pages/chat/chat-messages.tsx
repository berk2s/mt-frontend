import React, { useContext, useEffect, useRef, useState } from "react";
import MessageIcon from "../../components/icons/message.component";
import useRestCallEffect from "../../hooks/useRestCallEffect";
import SendMessageForm from "./send-message-form";
import Loader from "react-spinners/BounceLoader";
import { chatService } from "../../services/chat/chat.service";
import { ChatPerson, MessageResponse, UIMessage } from "../../services/types";
import { AppContext } from "../../App";
import { socketService } from "../../services/socketio/socketio.service";
import ThreeDotIcon from "../../components/icons/threedot.component";
import ChatAction from "./chat-action";
const socket = socketService.socket();

interface ChatMessagesProps {
  chatId: string;
  participant: ChatPerson;
  activeChat: any;
  //  isFetching: boolean;
}

const ChatMessages = (props: ChatMessagesProps) => {
  const {
    user: { userId },
  } = useContext(AppContext);

  const bottomRef = useRef(null);

  const { chatId, participant, activeChat } = props;

  const [isFetching, setIsFetching] = useState(true);
  const [chatMessages, setChatMessages] = useState<UIMessage[]>([]);

  useRestCallEffect(
    () => {
      const listener = async () => {
        console.log(chatId);
        socket.emit("join", { chatId: chatId });

        socket.on("chat", (data) => {
          if (data.chat.chatId === chatId) {
            console.log("IM RENDERED FOR", data.chat);
            setTimeout(() => {
              setChatMessages(data.chat.messages);
            }, 1000);
          }
        });
      };

      listener();
    },
    [chatId],
    () => {
      socket.off("chat");
    }
  );

  useRestCallEffect(async () => {
    if (!chatId) return;

    setIsFetching(true);

    const chatMessageResponse = await chatService.chatMessages(chatId);

    setChatMessages(chatMessageResponse);

    setIsFetching(false);
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const addTempMessage = (content: string) => {
    setChatMessages([
      ...chatMessages,
      {
        id: "",
        senderId: userId,
        chatId: "",
        content: content,
        createdAt: "",
        isTemp: true,
      },
    ]);
  };

  const isMe = (msgUserId: string): boolean => {
    return userId === msgUserId;
  };

  return isFetching ? (
    <div className="loader">
      <Loader color={"#ef5b0c"} loading={true} size={50} />
    </div>
  ) : (
    <>
      <div className="message-list-area-wrapper">
        <div className="chat-info-area">
          <div className="meta-area">
            <MessageIcon color={"#36AE7C"} width={24} height={24} />
            <span className="participant-name">{participant.fullName}</span>
          </div>
          {activeChat.status === "ACTIVE" && (
            <ChatAction
              matchingId={participant.matchingId}
              participantName={participant.fullName}
            />
          )}
        </div>

        <div className="chat-messages-area">
          {chatMessages.length === 0 && (
            <div className="no-message-area">
              <MessageIcon color={"#36AE7C"} width={36} height={36} />
              <span className="no-message-text">
                There is no any message yet
              </span>
            </div>
          )}
          {chatMessages.map((message, index) => {
            return (
              <div
                className={`chat-message-wrapper ${
                  isMe(message.senderId) ? "chat-message-reserve" : ""
                } ${message.isTemp && "just-sent-message"}`}
                key={index}
              >
                <div className="chat-message">
                  <span className="chat-message-text">{message.content}</span>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef}></div>
        </div>

        <div className="input-area">
          {activeChat.status === "ACTIVE" ? (
            <SendMessageForm
              chatId={chatId}
              participantId={participant.id}
              addTempMessage={addTempMessage}
            />
          ) : (
            <span className="closed-chat-text">This chat closed</span>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatMessages;
