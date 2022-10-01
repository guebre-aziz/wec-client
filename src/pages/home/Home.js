import React, { useEffect } from "react";
import "./home.css";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/Rightbar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../common/cookieMngr";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCookie("username")) {
      navigate("/login");
    }
  });

  return (
    <>
      <div className="mainContainer">
        <div className="homeContainer">
          <Feed />
          <RightBar />
        </div>
      </div>
    </>
  );
}
