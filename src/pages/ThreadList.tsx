import { useEffect, useState } from "react";
import apiAxios from "../utils/apiAxios";
import { useNavigate, useParams } from "react-router-dom";
import PopUp, { threadRef } from "../components/PopUp";
import { CircularProgress } from "@mui/material";
import ThreadAction from "../components/ThreadAction";
import '../styles/ThreadList.css'

export interface threadType {
  id: string;
  createdAt: string;
  urgencyTag: string;
  authorId: string;
  courseId: string;
  status: string;
  topic: string;
  content: string;
  parentThreadId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  parentThread: {
    id: string;
    createdAt: string;
    courseId: string;
    urgencyTag: string;
    authorId: string;
    status: string;
    topic: string;
    content: string;
    parentThreadId: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
    };
  }
}

export default function ThreadList() {
  const { course_id, urgency_tag } = useParams();
  const navigate = useNavigate();
  const [threadList, setThreadList] = useState<threadType[]>([]);
  const [reference, setReference] = useState<threadRef>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getThreadList = async () => {
      setLoading(true);
      const response = await apiAxios.get(`/courses/${course_id}/threads`, {
        params: {
          urgency: urgency_tag,
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
      <>
        <div className="no-thread">
          <h1>No Threads</h1>
        </div>
        <button className="add-button" onClick={handleAddButton}>
          +
        </button>
        {popUp ? <PopUp handleCancel={handleCancelButton} /> : null}
      </>
    );
  }

  return (
    <>
      {threadList.map((data, index) => (
        <div className="question-expanded" style={{overflowY: "visible"}} key={index}>
          <ThreadAction
            showModal={handleAddButton}
            setReference={setReference}
            threadId={data.id}
            threadTopic={data.topic}
          />

          <div
            key={index}
            className="question-flow"
            onClick={() => {
              navigate(`/courses/${course_id}/threads/${data.id}/messages`);
            }}
          >
            <h5>author: {data.user.firstName + " " + data.user.lastName}</h5>
            <h4>{data.topic}</h4>

            <h1>{data.content}</h1>
            {data.parentThread && (
              <ReferenceThread parentThread={data.parentThread} />
            )}
            <hr />
          </div>
          
        </div>
      ))}
      <button className="add-button" onClick={handleAddButton}>
        +
      </button>

      {popUp ? <PopUp handleCancel={handleCancelButton} reference={reference} /> : null}
    </>
  );
}

interface parentThreadProps {
  parentThread: {
    id: string;
    createdAt: string;
    urgencyTag: string;
    courseId: string;
    authorId: string;
    status: string;
    topic: string;
    content: string;
    parentThreadId: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
    };
  }
}

function ReferenceThread({parentThread}: parentThreadProps) {
  const navigate = useNavigate();
  return (
    <div className="reference-thread">
      <h1>Reference Thread</h1>
      <div style={{border: "1px solid black", padding: "10px 5px 5px 5px", borderRadius:"5px"}} onClick={() => {
        navigate(`/courses/${parentThread.courseId}/threads/${parentThread.id}/messages`);
      }}>
        <h4>{parentThread.topic}</h4>
        <h1>{parentThread.content}</h1>
      </div>

      
    </div>
  );
}