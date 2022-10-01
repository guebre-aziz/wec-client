import React from "react";
import "./resultsTab.css";
import { useNavigate } from "react-router-dom";

export default function ResultsTab(props) {
  const results = props.data;
  const navigate = useNavigate();
  const handleClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return results ? (
    <div className="resultsTab">
      {results.map((user) => {
        return (
          <ul key={user.username + "elem"}>
            <div className="elem" onClick={() => handleClick(user.username)}>
              <div className="elemImg">
                <img
                  src={user.profilePicture}
                  alt=""
                  crossOrigin="use-credentials"
                />
              </div>
              <div>
                <p>{user.username}</p>
                <p>{user.city && user.city}</p>
              </div>
            </div>
          </ul>
        );
      })}
    </div>
  ) : (
    <span>no result</span>
  );
}
