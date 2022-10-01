import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  asyncFetchUser,
  asyncSignUp,
  getSignUpStatus,
  getUserData,
} from "../../features/redux/usersSlice";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUpStatus = useSelector(getSignUpStatus);
  const userData = useSelector(getUserData).user;

  const handleInputChange = (e) => {
    const target = e.target.id;
    const value = e.target.value;
    switch (target) {
      case "usernameField":
        setUsername(value);
        break;
      case "emailField":
        setEmail(value);
        break;
      case "passwordField":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    dispatch(asyncSignUp({ username, email, password }));
  };
  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (signUpStatus === "success") {
      dispatch(asyncFetchUser(username));
      navigate(`/profile/${username}`);
    }
  }, [signUpStatus, userData]);

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">weConnect</h3>
          <span className="registerDesc">
            Connect with friends and the world!
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input
              id="usernameField"
              placeholder="Username"
              className="inputStyled"
              value={username}
              onChange={handleInputChange}
            />
            <input
              id="emailField"
              placeholder="Email"
              type="email"
              className="inputStyled"
              value={email}
              onChange={handleInputChange}
            />
            <input
              id="passwordField"
              placeholder="Password"
              type="password"
              className="inputStyled"
              value={password}
              onChange={handleInputChange}
            />
            <button className="loginButton" onClick={handleSubmit}>
              Sign Up
            </button>
            <button className="loginRegisterButton" onClick={handleLogin}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
