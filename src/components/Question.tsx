// import { threadType } from "../pages/Course";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import apiAxios from "../utils/apiAxios";

// interface Props {
//   threadID: string;
//   courseID: string;
//   urgencyTag: string;
// }

// export default function Question({
//   threadID,
//   courseID,
//   urgencyTag,
// }: Props) {

//   const [threadList, setThreadList] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   useEffect(() => {
//     const getThreadList = async () => {
//       const response = await axios.get(
//         `http://localhost:3000/courses/${courseID}/threads`,
//         {
//           params: {
//             urgencyTag: urgencyTag,
//           },
//         }
//       );

//       getThreadList();
//       setThreadList(response.data);
//     };

//   },[])

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     const toPost = {
//       id: threadID,
//       course_id: courseID,
//       author_id: "fdsakfkalffasd",
//       urgency_tag: urgencyTag,
//       status: "pending",
//       created_at: 1711194627000,
//       topic: "",
//       content: inputValue,
//       parent_ref: "aslfdvjfdaafalv",
//     };
//     axios.post("http://localhost:8000/threads", toPost).then((response) => {
//       console.log(response.status, response.data);
//     });
//     setInputValue("");
//   };

//   return (
//     <div className="question-expanded">
//       {threadList.map((data) => (
//         <div className="question-flow">
//           <h5>author: {data.author_id}</h5>
//           <h4>{data.topic}</h4>

//           <h1>{data.content}</h1>
//           <hr />
//         </div>
//       ))}

//       <div className="question-input-row">
//         <div className="send-row">
//           <input
//             type="text"
//             className="send-text-field"
//             id="input-text"
//             value={inputValue}
//             onChange={handleInputChange}
//           ></input>
//           <button className="send-btn" onClick={handleSubmit}>
//             Submit
//           </button>
//         </div>
//         <button className="resolve-btn">Resolve</button>
//       </div>
//     </div>
//   );
// }
