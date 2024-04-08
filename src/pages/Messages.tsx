import { useEffect, useState } from "react";
import apiAxios from "../utils/apiAxios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { threadType } from "./ThreadList";
export interface messageType {
  id: string;
  threadId: string;
  authorId: string;
  message: string;
  createdAt: string;
}

export default function Messages() {
  const { course_id, thread_id } = useParams();
  const [messages, setMessages] = useState<messageType[]>([]);
  const [threadInfo, setThreadInfo] = useState<threadType>();
  const [inputValue, setInputValue] = useState("");
  const [loadingMsg, setLoadingMsg] = useState<boolean>(true);
  const [loadingInfo, setLoadingInfo] = useState<boolean>(true);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const getThreadInfo = async () => {
      const response = await apiAxios.get(
        `/courses/${course_id}/threads/${thread_id}`
      );
      setThreadInfo(response.data);
      setLoadingInfo(false);
    };
    const getMessages = async () => {
      try {
        const response = await apiAxios.get(
          `/courses/${course_id}/threads/${thread_id}/messages`
        );
        setMessages(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMsg(false);
      }
    };

    getThreadInfo();
    getMessages();
  }, []);

  if (loadingMsg || loadingInfo) {
    return <CircularProgress />;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // const toPost = {
    //   id: threadID,
    //   course_id: courseID,
    //   author_id: "fdsakfkalffasd",
    //   urgency_tag: urgencyTag,
    //   status: "pending",
    //   created_at: 1711194627000,
    //   topic: "",
    //   content: inputValue,
    //   parent_ref: "aslfdvjfdaafalv",
    // };
    // axios.post("http://localhost:8000/threads", toPost).then((response) => {
    //   console.log(response.status, response.data);
    // });
    // setInputValue("");
  };

  return (
    <>
      <div className="question-expanded">
        <div className="question-flow">
          <h5>author: {threadInfo?.authorId}</h5>
          <h4>{threadInfo?.topic}</h4>
          <h1>{threadInfo?.content}</h1>
          <hr />
        </div>
        {messages.map((data) => (
          <div className="question-flow">
            <h5>author: {data.authorId}</h5>
            <h4>{data.message}</h4>

            <hr />
          </div>
        ))}
        <div className="question-input-row">
          <div className="send-row">
            <input
              type="text"
              className="send-text-field"
              id="input-text"
              value={inputValue}
              onChange={handleInputChange}
            ></input>
            <button className="send-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <button className="resolve-btn">Resolve</button>
        </div>
      </div>
    </>
  );
}
