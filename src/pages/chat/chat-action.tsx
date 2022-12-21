import React, { useContext, useState } from "react";
import ThreeDotIcon from "../../components/icons/threedot.component";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AppContext } from "../../App";
import { matchingService } from "../../services/matching/matching.service";

interface ChatAction {
  matchingId: string;
  participantName: string;
}

const ChatAction = ({ matchingId, participantName }) => {
  const { setToastSettings } = useContext(AppContext);

  const [show, setShow] = useState(false);

  const unMatch = async () => {
    try {
      const unmatch = await matchingService.unmatch(matchingId);

      if (unmatch && unmatch.id) {
        setToastSettings({
          text: `Matching with ${participantName} removed`,
          show: true,
          className: "bg-success",
        });
      }
    } catch (err) {
      setToastSettings({
        text: "Unknown error has occured",
        show: true,
        className: "bg-warning",
      });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="action-area mr-1" onClick={() => setShow(!show)}>
          <span>END CHAT</span>
        </div>
        <div className="action-area" onClick={() => setShow(!show)}>
          <span>REPORT</span>
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to end chat with <b>{participantName}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={unMatch}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChatAction;
