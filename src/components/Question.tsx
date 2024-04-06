import { threadType } from "../pages/Course";
import { useState } from "react";
import axios from "axios";

interface Props {
  threadList: threadType[];
  threadID: string;
  courseID: string;
  urgencyTag: string;
}

export default function Question({
  threadList,
  threadID,
  courseID,
  urgencyTag,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const toPost = {
      id: threadID,
      course_id: courseID,
      author_id: "fdsakfkalffasd",
      urgency_tag: urgencyTag,
      status: "pending",
      created_at: 1711194627000,
      topic: "",
      content: inputValue,
      parent_ref: "aslfdvjfdaafalv",
    };
    axios.post("http://localhost:8000/threads", toPost).then((response) => {
      console.log(response.status, response.data);
    });
    setInputValue("");
  };

  return (
    <div className="question-expanded">
      {threadList.map((content) => (
        <div className="question-flow">
          <h5>author: {content.author_id}</h5>
          <h4>{content.topic}</h4>

          <h1>{content.content}</h1>
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
  );
}
