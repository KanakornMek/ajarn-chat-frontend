import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiAxios from "../utils/apiAxios";

interface Course {
  id: string;
  name: string;
  semester: number;
  year: number;
  uniCourseId: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export default function NavBar() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { course_id } = useParams();
  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await apiAxios.get("/user");
      setUser(userInfo.data);
    };

    const getCourses = async () => {
      let courses = await apiAxios.get("/courses");
      setCourses(courses.data);
    };

    getCourses();
    getUserInfo();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <div className="nav-bar-top">
        <div className="profile-container"></div>
        <h3
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "10ch",
            overflow: "hidden",
          }}
        >
          {user?.firstName + " " + user?.lastName}
        </h3>
      </div>

      <ul className="course-list">
        <h4
          style={{
            marginLeft: "20px",
            marginBottom: "10px",
            marginTop: "30px",
          }}
        >
          Courses
        </h4>

        {courses.map((course) => (
          <li
            key={course.id}
            onClick={() => {
              navigate("/courses/" + course.id + "/threads/announcements", {
                replace: true,
              });
            }}
            className={
              course.id === course_id ? "nav-tile-selected" : "nav-tile"
            }
          >
            <h1>
              {course.uniCourseId} {course.name}
            </h1>
          </li>
        ))}
      </ul>
    </div>
  );
}
