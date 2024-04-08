import { useParams, useNavigate, Routes, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import PopUp from "../components/PopUp";
import apiAxios from "../utils/apiAxios";
// import Announcement from "../components/Message";

export interface courseType {
  id: string;
  name: string;
  semester: string;
  year: number;
  uniCourseId: string;
}



export default function Course() {
  /*data*/
  const [courseData, setCourseData] = useState<courseType>();

  const { course_id, thread_urgency } = useParams();

  useEffect(() => {
    const getCourseData = async () => {
      const courses = await apiAxios.get(`/courses/${course_id}`);
      setCourseData(courses.data);
    };

    getCourseData();
  }, []);

  /*params*/

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

  const navigate = useNavigate();

  return (
    <div className="course">
      <div className={popUp ? "blurer" : "course"}>
        <NavBar />
        <div className="course-content">
          <div className="course-nav-bar">
            <div
              className="course-nav-bar-tile"
              style={{ borderBottom: "1px solid black" }}
            >
              <h1>
                {courseData?.uniCourseId} {courseData?.name}
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
                      "/courses/" +
                        course_id +
                        "/threads/" +
                        thread.urgency_tag
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
              {/* <h1>{threadName ? threadName : "# Announcements"}</h1> */}
            </div>
            <div className="course-thread">
              <Outlet />
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}
