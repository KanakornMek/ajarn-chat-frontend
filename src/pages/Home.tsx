import { useState } from "react";

export default function Home() {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");

  const handleIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setID("");
    setPassword("");
  };

  return (
    <div className="home">
      <div className="home-left"></div>
      <div className="log-in">
        <div className="input-container">
          <h4>Chulalongkorn ID</h4>
          <input type="text" onChange={handleIDChange} value={id}></input>
        </div>
        <div className="input-container">
          <h4>Password</h4>
          <input
            type="text"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </div>
        <div className="input-container">
          <button className="log-in-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
