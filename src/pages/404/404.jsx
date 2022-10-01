import React, { useEffect } from "react";
import "./404.css";
import { getCookie } from "../../common/cookieMngr";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCookie("username")) {
      navigate("/login");
    }
  });
  return (
    <div className="notFound">
      <h1>Opss..</h1>
      <h1>Page not found!</h1>
    </div>
  );
}
