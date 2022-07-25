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
      <div className="action-area" onClick={() => setShow(!show)}>
        <span>UNMATCH</span>
      </div>

      <Modal show={show} onHide={() => setShow(false)} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you remove the matching, you won't see <b>{participantName}</b> in
          the discovery for a long time.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={unMatch}>
            Unmatch
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChatAction;
