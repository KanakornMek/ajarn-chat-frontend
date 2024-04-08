import { useForm } from "react-hook-form";
import { loginUser } from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import apiAxios from "../utils/apiAxios";
import { useEffect } from "react";

interface FormData {
  studentIdOrEmail: string;
  password: string;
}

const isStudentId = (value: string): boolean => {
  return /^\d{10}$/.test(value);
};

const isEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { setToken, isAuthenticated } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {

    if(isAuthenticated){
      const navigateCourses = async () => {
        const course_id = await apiAxios.get('courses');
        navigate("/courses/" + course_id.data[0].id + "/threads/announcements");
      }
      navigateCourses();
    }
    
  },[isAuthenticated])

  const onSubmit = async (data: FormData) => {
    await loginUser({
        email: isEmail(data.studentIdOrEmail) ? data.studentIdOrEmail : undefined,
        id: isStudentId(data.studentIdOrEmail) ? data.studentIdOrEmail : undefined,
        password: data.password
    }, setToken);
    
  };
  const validateStudentIdOrEmail = (value: string): string | undefined => {
    if (!value.trim()) return "This field is required";
    if (!isStudentId(value) && !isEmail(value))
      return "Invalid student ID or email";
    return undefined;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="log-in">
      <div className="input-container">
        <h4>Chulalongkorn ID</h4>
        <input
          type="text"
          {...register("studentIdOrEmail", {
            required: "This field is required",
            validate: validateStudentIdOrEmail,
          })}
        ></input>
        {errors.studentIdOrEmail && (
          <span style={{color: "red"}}>{errors.studentIdOrEmail.message}</span>
        )}
      </div>
      <div className="input-container">
        <h4>Password</h4>
        <input
          type="password"
          {...register("password", {
            required: "This field is required",
          })}
        ></input>
      </div>
      <div className="input-container">
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
