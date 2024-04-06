import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Message from "../components/Message";
import PopUp from "../components/PopUp";
import Question from "../components/Question";

export interface courseType {
  id: string;
  course_name: string;
  semester: number;
  year: number;
}

export interface threadType {
  id: string;
  course_id: string;
  author_id: string;
  urgency_tag: string;
  status: string;
  created_at: number;
  topic: string;
  content: string;
  parent_ref?: string;
}

export default function Course() {
  /*data*/
  const [courseData, setCourseData] = useState<courseType[]>([]);
  const [threadData, setThreadData] = useState<threadType[]>([]);
  const callApi = async (get: string) => {
    try {
      const res = await axios.get("http://localhost:8000/" + get);
      if (get === "courses") {
        setCourseData(res.data);
      }
      if (get === "threads") {
        setThreadData(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    callApi("courses");
    callApi("threads");
  }, []);

  /*params*/
  const { course_id } = useParams();
  const { thread_urgency } = useParams();

  /*array*/
  const threadArray = [
    { urgency_name: "!!! Urgent", urgency_tag: "urgent" },
    { urgency_name: "!! Regular", urgency_tag: "regular" },
    { urgency_name: "! Low Priority", urgency_tag: "low_priority" },
  ];
  /*function*/

  /*state*/
  const [popUp, changePopUp] = useState(false);
  const handleAddButton = () => {
    changePopUp(true);
  };
  const handleCancelButton = () => {
    changePopUp(false);
    console.log(popUp);
  };
  const getByID = (get: keyof courseType) => {
    for (var course of courseData) {
      if (course_id === course.id) {
        return course[get];
      }
    }
  };
  const getThreadName = () => {
    for (var thread of threadArray) {
      if (thread_urgency === thread.urgency_tag) {
        return thread.urgency_name;
      }
    }
  };
  const navigate = useNavigate();

  /*var*/
  const courseName = getByID("course_name");
  const threadName = getThreadName();
  const filtredThreadData: threadType[] = [];
  for (var content of threadData) {
    console.log(content.course_id);
    console.log(course_id);
    if (
      thread_urgency === content.urgency_tag &&
      course_id === content.course_id
    ) {
      filtredThreadData.push(content);
    }
  }
  const threadMap: { [id: string]: threadType[] } = {};
  for (var content of filtredThreadData) {
    if (content.id in threadMap) {
      threadMap[content.id].push(content);
    } else {
      threadMap[content.id] = [content];
    }
  }
  console.log(threadMap);

  return (
    <div className="course">
      <div className={popUp ? "blurer" : "course"}>
        <NavBar courses={courseData} />
        <div className="course-content">
          <div className="course-nav-bar">
            <div
              className="course-nav-bar-tile"
              style={{ borderBottom: "1px solid black" }}
            >
              <h1>
                {course_id} {courseName}
              </h1>
            </div>
            <ul>
              <li
                className={
                  thread_urgency === "announcements"
                    ? "course-nav-bar-tile-selected"
                    : "course-nav-bar-tile"
                }
                onClick={() => {
                  navigate("/courses/" + course_id + "/threads/announcements");
                }}
              >
                <h1>#Announcement</h1>
              </li>
            </ul>
            <div style={{ paddingLeft: "20px" }}>
              <h1>Questions from students</h1>
            </div>
            <ul>
              {threadArray.map((thread) => (
                <li
                  key={thread.urgency_tag}
                  className={
                    thread_urgency === thread.urgency_tag
                      ? "course-nav-bar-tile-selected"
                      : "course-nav-bar-tile"
                  }
                  onClick={() => {
                    navigate(
                      "/courses/" + course_id + "/threads/" + thread.urgency_tag
                    );
                  }}
                >
                  <h1>{thread.urgency_name}</h1>
                </li>
              ))}
            </ul>
          </div>
          <div className="course-right">
            <div
              style={{
                backgroundColor: "white",
                borderBottom: "1px solid black",
                height: "15px",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                borderRadius: "0px 10px 0px 0px",
              }}
            >
              <h1>{threadName ? threadName : "# Announcements"}</h1>
            </div>
            <div className="course-thread">
              {Object.keys(threadMap).map((threadId) =>
                thread_urgency === "announcements" ? (
                  <Message threadList={threadMap[threadId]} />
                ) : (
                  <Question
                    threadList={threadMap[threadId]}
                    threadID={threadId}
                    courseID={course_id ? course_id : ""}
                    urgencyTag={thread_urgency ? thread_urgency : ""}
                  />
                )
              )}
            </div>
            <button className="add-button" onClick={handleAddButton}>
              +
            </button>
          </div>
        </div>
      </div>
      {popUp ? <PopUp handleCancel={handleCancelButton} /> : null}
    </div>
  );
}
