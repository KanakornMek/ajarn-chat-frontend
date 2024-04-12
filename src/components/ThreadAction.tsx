import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../styles/ThreadAction.css";
import { useState } from "react";
import { threadRef } from "./PopUp";

interface Props {
    threadId: string;
    threadTopic: string;
  showModal: () => void;
  setReference: React.Dispatch<React.SetStateAction<threadRef | undefined>>;
  
}
export default function ThreadAction({ showModal, setReference, threadId, threadTopic  }: Props) {
  const [actionsPopOut, setActionsPopOut] = useState<boolean>(false);

  return (
    <>
      <div
        className="thread_action_container"
        onClick={() => setActionsPopOut(true)}
      >
        <div className="thread_action">
          <MoreVertIcon style={{ color: "gray" }} />
        </div>
      </div>
      {actionsPopOut && (
        <>
          <div
            className="layer"
            style={{}}
            onClick={() => setActionsPopOut(false)}
          ></div>
          <div
            className="actions_popout"
            onClick={() => {
              setActionsPopOut(false);
              showModal();
              setReference({
                id: threadId,
                topic: threadTopic,
              })
            }}
          >
            <p>Reference Thread</p>
          </div>
        </>
      )}
    </>
  );
}
// onClick={showModal}
