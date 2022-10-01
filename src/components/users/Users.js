import React from "react";
import { useNavigate } from "react-router-dom";
import "./users.css";

export default function Users(props) {
  const navigate = useNavigate();
  const users = props.users;

  const handleClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <>
      <div className="usersContainer">
        <ul>
          {users.map((user) => {
            return (
              <li
                key={user.username}
                className="usersChild"
                onClick={() => handleClick(user.username)}
              >
                <div className="usersImg">
                  <img
                    src={user.profilePicture}
                    alt=""
                    crossOrigin="use-credentials"
                  />
                </div>
                <div>
                  <h4>{user.username}</h4>
                  <p>{user.city}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
