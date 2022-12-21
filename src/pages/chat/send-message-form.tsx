import React, { useContext } from "react";
import { Formik, Field } from "formik";
import FormElement from "../../components/form-element/form-element";
import SendIcon from "../../components/icons/send.component";
import * as Yup from "yup";
import { SendMessageRequest } from "../../services/types";
import { AppContext } from "../../App";
import { chatService } from "../../services/chat/chat.service";
import generateError from "../../utility/api-utility";
import { socketService } from "../../services/socketio/socketio.service";
import { useAccordionButton } from "react-bootstrap";

interface SendMessageFormProps {
  chatId: string;
  participantId: string;
  addTempMessage: (content: string) => void;
}

const SendMessageFormSchema = Yup.object().shape({
  message: Yup.string().required("Please typo someting"),
});

const SendMessageForm = (props: SendMessageFormProps) => {
  const { chatId, participantId, addTempMessage } = props;
  const { setToastSettings, user } = useContext(AppContext);

  const sendMessage = async (message: string) => {
    try {
      const socket = await socketService.socket();

      socket.emit("chat", {
        from: user.userId,
        to: chatId,
        content: message,
      });

      addTempMessage(message);
    } catch (err) {
      setToastSettings({
        text: "Unknown error has occured",
        show: true,
        className: "bg-warning",
      });
    }
  };

  const onSubmit = async (values: any, actions: any) => {
    const { message } = values;

    actions.setSubmitting(false);

    await sendMessage(message);

    actions.resetForm();
  };

  const handleKeyDown = (submitForm) => (event) => {
    if (event.key === "Enter") {
      submitForm();
    }
  };

  return (
    <Formik
      initialValues={{
        message: "",
      }}
      validationSchema={SendMessageFormSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm }) => (
        <div className="send-message-area">
          <Field
            id="message"
            name="message"
            className="form-control custom-input message-input"
            placeholder="Typo something"
            onKeyDown={handleKeyDown(submitForm)}
          />

          <div
            className="send-message-btn"
            onClick={() => {
              submitForm();
            }}
          >
            <SendIcon color={"#ddd"} width={20} height={20} />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SendMessageForm;
