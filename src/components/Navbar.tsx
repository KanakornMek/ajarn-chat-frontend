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
        <h4>Pawarisa Munj.</h4>
      </div>

      <ul className="course-list">
        <h3 style={{ marginLeft: "10px", marginBottom: "0px" }}>Courses</h3>

        {courses.map((course) => (
          <li
            onClick={() => {
              navigate("/courses/" + course.id + "/threads/announcements", {
                replace: true,
              });
            }}
            className={
              course.id === course_id ? "nav-tile-selected" : "nav-tile"
            }
          >
            <h2>
              {course.id} {course.course_name}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
