import React, { useEffect, useState } from "react";
import "./topbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, useNavigate } from "react-router-dom";
import {
  asyncFetchSearchUsers,
  asyncFetchUserLogged,
  getUserLoggedData,
  getUsersSearchData,
} from "../../features/redux/usersSlice";
import ResultsTab from "../resultsTab/ResultsTab";
import { getCookie, setCookie } from "../../common/cookieMngr";
import { setLoginStatus } from "../../features/redux/usersSlice";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const usersSearchData = useSelector(getUsersSearchData);
  const userLogged = useSelector(getUserLoggedData);
  const cookieUsername = getCookie("username");

  const handleOnChange = (e) => {
    setSearchKey(e.target.value);
  };
  const handleOnFocus = () => setIsFocus(true);
  const handleOnBlur = () => {
    setTimeout(() => {
      // timeout-wrapped to prevent disappearance before action
      setIsFocus(false);
    }, 100);
  };

  const handleLogoutBtn = () => {
    setCookie("username", "");
    setCookie("userId", "");
    dispatch(setLoginStatus(""));
    navigate("/login");
  };

  const handleUserBtn = () => {
    navigate(`/profile/${getCookie("username")}`);
  };

  const handleHomeBtn = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(asyncFetchSearchUsers(searchKey));
  }, [searchKey]);

  useEffect(() => {
    dispatch(asyncFetchUserLogged());
  }, [cookieUsername]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">weConnect</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            placeholder="Search users"
            className="searchInput"
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            value={searchKey}
          />
        </div>
        {isFocus && <ResultsTab data={usersSearchData} />}
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem" onClick={handleHomeBtn}>
            <HomeRoundedIcon />
          </div>
          <div className="topbarIconItem" onClick={handleUserBtn}>
            <PersonRoundedIcon />
          </div>
          <div className="topbarIconItem logoutBtn" onClick={handleLogoutBtn}>
            <LogoutRoundedIcon />
          </div>
        </div>
        <div className="userWelcoming">
          <h4>Hi {userLogged.username}!</h4>
        </div>
        <img
          src={userLogged.profilePicture}
          crossOrigin="use-credentials"
          alt=""
          className="topbarImg"
        />
      </div>
    </div>
  );
}
