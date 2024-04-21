import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
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
  const { course_id, urgency_tag } = useParams();
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    const getCourseData = async () => {
      const courses = await apiAxios.get(`/courses/${course_id}`);
      setCourseData(courses.data);
    };

    getCourseData();
  }, []);

  /*array*/
  const threadArray = [
    { urgency_name: "!!! Urgent", urgency_tag: "urgent" },
    { urgency_name: "!! Regular", urgency_tag: "regular" },
    { urgency_name: "! Low Priority", urgency_tag: "lowPriority" },
  ];

  /*function*/
  var banner = (urgency_tag: any) => {
    for (var i = 0; i < threadArray.length; i++) {
      if (urgency_tag == threadArray[i].urgency_tag) {
        return threadArray[i].urgency_name;
      }
    }
  };

  /*state*/

  const navigate = useNavigate();

  return (
    <div className="course">
      <div className="course">
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
                  urgency_tag === "announcements"
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
                    urgency_tag === thread.urgency_tag
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
              <h1>
                {banner(urgency_tag) ? banner(urgency_tag) : "Announcement"}
              </h1>
            </div>
            <div className="course-thread">
              <Outlet context={setTitle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
