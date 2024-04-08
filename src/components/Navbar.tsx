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
export default function NavBar() {
  const [courses, setCourses] = useState<Course[]>([]); 
  const { course_id } = useParams();
  useEffect(() => {
    const getCourses = async () => {
      let courses = await apiAxios.get('/courses');
      setCourses(courses.data);
    }

    getCourses();
  }, [])
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <div className="nav-bar-top">
        <div className="profile-container"></div>
        <h3>Pawarisa Munj.</h3>
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
