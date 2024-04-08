import { useEffect, useState } from "react";
import apiAxios from "../utils/apiAxios";
import { useNavigate, useParams } from "react-router-dom";
import PopUp from "../components/PopUp";
import { CircularProgress } from "@mui/material";

export interface threadType {
  id: string;
  createdAt: string;
  urgencyTag: string;
  authorId: string;
  status: string;
  topic: string;
  content: string;
  parentThreadId: string;
}

export default function ThreadList() {
  const { course_id, urgency_tag } = useParams();
  const navigate = useNavigate();
  const [threadList, setThreadList] = useState<threadType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Hello");
    const getThreadList = async () => {
      const response = await apiAxios.get(`/courses/${course_id}/threads`, {
        params: {
          urgencyTag: urgency_tag,
        },
      });
      setThreadList(response.data);
      setLoading(false);
    };
    getThreadList();
  }, [course_id, urgency_tag]);

  const [popUp, changePopUp] = useState(false);
  const handleAddButton = () => {
    changePopUp(true);
  };
  const handleCancelButton = () => {
    changePopUp(false);
    console.log(popUp);
  };
  if (loading) {
    return <CircularProgress />;
  }

  if (threadList.length == 0) {
    return (
      <div className="no-thread">
        <h1>No Threads</h1>
      </div>
    );
  }

  return (
    <div className="question-expanded">
      {threadList.map((data, index) => (
        <div key={index} className="question-flow" onClick={() => {
          navigate(`/courses/${course_id}/threads/${data.id}/messages`);
        }}>
          <h5>author: {data.authorId}</h5>
          <h4>{data.topic}</h4>

          <h1>{data.content}</h1>
          <hr />
        </div>
      ))}
      <button className="add-button" onClick={handleAddButton}>
        +
      </button>
      {popUp ? <PopUp handleCancel={handleCancelButton} /> : null}
    </div>
  );
}
