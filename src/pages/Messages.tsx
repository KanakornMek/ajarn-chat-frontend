import { useEffect, useRef, useState } from "react";
import apiAxios from "../utils/apiAxios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { threadType } from "./ThreadList";
import { io, Socket } from "socket.io-client";
import '../styles/Messages.css'

export interface messageType {
  id: string;
  threadId: string;
  authorId: string;
  message: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string,
    lastName: string,
    role: string;
  }
}

export default function Messages() {
  const { course_id, thread_id } = useParams();
  const [messages, setMessages] = useState<messageType[]>([]);
  const [threadInfo, setThreadInfo] = useState<threadType>();
  const [messageInput, setMessageInput] = useState("");
  const [loadingMsg, setLoadingMsg] = useState<boolean>(true);
  const [loadingInfo, setLoadingInfo] = useState<boolean>(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(messages.length)
    if(messages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end"
      })
    }
  },[messages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  useEffect(() => {
    socket?.connect();
    return () => {
      socket?.disconnect();
    }
  }, [socket]);


  useEffect(() => {
    setSocket(
      io(import.meta.env.VITE_WS_URL, {
        auth: {
          token: localStorage.getItem("token"),
        },
        autoConnect: false
      })
    );
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
        console.log(response.data)
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMsg(false);
      }
    };

    getThreadInfo();
    getMessages();
    ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end"
      })
  }, [thread_id]);

  const sendMessage = () => {
    if (messageInput.trim() === "") return;
    if (socket) {
      console.log(thread_id);
      socket.emit("message", {
        course: course_id,
        message: messageInput,
        thread: thread_id,
      });
      setMessageInput("");
    }
  };

  useEffect(() => {
    if(socket)
      socket?.emit("join",{course: course_id, thread: thread_id})
  },[course_id, thread_id, socket])

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: messageType) => {
        setMessages((prev) => [...prev, message]);
      });
      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  if (loadingMsg || loadingInfo) {
    return <CircularProgress />;
  }

  return (
    <>
      <div className="question-expanded">
        <div className="question-flow">
          <h5>author: {threadInfo?.user.firstName + " " + threadInfo?.user.lastName}</h5>
          <h4>{threadInfo?.topic}</h4>
          <h1>{threadInfo?.content}</h1>
          <hr />
        </div>
        {messages.map((data, index) => (
          <div key={index} className="question-flow">
            <h5>{data.user.firstName + " " + data.user.lastName}</h5>
            <p className="message-content">{data.message}</p>

            <hr />
          </div>
        ))}
        <div ref={ref} />
      </div>
      <div className="question-input-row">
          <div className="send-row">
            <input
              type="text"
              className="send-text-field"
              id="input-text"
              value={messageInput}
              onChange={handleInputChange}
            ></input>
            <button className="send-btn" onClick={sendMessage}>
              <SendRoundedIcon style={{color: "white"}} />
            </button>
          </div>
          <button className="resolve-btn">Resolve</button>
        </div>
    </>
  );
}
