import React, { useState, useEffect } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncLogin,
  getUserData,
  getUserLoginStatus,
} from "../../features/redux/usersSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailField = (e) => setEmail(e.target.value);
  const handlePasswordField = (e) => setPassword(e.target.value);
  const loginStatus = useSelector(getUserLoginStatus);
  const userData = useSelector(getUserData).user;
  const handleSubmit = () => {
    dispatch(asyncLogin({ email, password }));
  };

  useEffect(() => {
    if (loginStatus === "success") {
      navigate(`/profile/${userData?.username}`);
    }
  }, [loginStatus]);

  const handleRegisterButton = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">weConnect</h3>
            <span className="loginDesc">
              Connect with friends and the world around you!
            </span>
          </div>
          <div className="loginRight">
            <div className="loginBox">
              <input
                placeholder="Email"
                type="email"
                className="inputStyled"
                value={email}
                onChange={handleEmailField}
              />
              <input
                placeholder="Password"
                type="password"
                className="inputStyled"
                value={password}
                onChange={handlePasswordField}
              />
              <button className="loginButton" onClick={handleSubmit}>
                Login
              </button>
              <button
                className="loginRegisterButton"
                onClick={handleRegisterButton}
              >
                Create a new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
