import { courseType } from "../pages/Course";
import { useParams, useNavigate } from "react-router-dom";

interface Props {
  courses: courseType[];
}
export default function NavBar({ courses }: Props) {
  const { course_id } = useParams();

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
              {course.id} {course.course_name}
            </h1>
          </li>
        ))}
      </ul>
    </div>
  );
}
