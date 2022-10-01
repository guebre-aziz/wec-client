import React, { useEffect, useRef } from "react";
import "./notifier.css";
import { useSelector } from "react-redux";
import {
  getUserLoginStatus,
  getSignUpStatus,
  getFollowUnfollowStatus,
  getDeleteUserStatus,
} from "../../features/redux/usersSlice";
import {
  getCreatePostStatus,
  getDeletePostStatus,
} from "../../features/redux/postsSlice";
import { getCookie } from "../../common/cookieMngr";

export default function Notifier() {
  const notifier = useRef(null);
  const createPostStatus = useSelector(getCreatePostStatus);
  const loginStatus = useSelector(getUserLoginStatus);
  const signUpStatus = useSelector(getSignUpStatus);
  const deletePostStatus = useSelector(getDeletePostStatus);
  const followUnfollowStatus = useSelector(getFollowUnfollowStatus);
  const deleteUserStatus = useSelector(getDeleteUserStatus);
  const usernameCookie = getCookie("username");

  function notify(message, color, delay) {
    let delayParam = 3000; // default delay
    if (typeof delay == "number" && delay > 0) delayParam = delay;
    const currentObject = notifier.current;
    currentObject.innerHTML = message;
    currentObject.style.backgroundColor = color;
    currentObject.style.height = "60px";
    currentObject.style.padding = "10px";

    setTimeout(() => {
      currentObject.style.backgroundColor = "transparent";
      currentObject.style.height = "0";
      currentObject.style.padding = "10px 0";
      currentObject.innerHTML = "";
    }, delayParam);
  }

  useEffect(() => {
    switch (signUpStatus) {
      case "success":
        notify(
          `Successfully registred. Welcome ${usernameCookie}!<br> Start by editing your profile.`,
          "green",
          8000
        );
        break;
      case "failed":
        notify("Error, retry later or contact the admin", "red");
        break;

      default:
        break;
    }
  }, [signUpStatus]);

  useEffect(() => {
    switch (loginStatus) {
      case "success":
        notify(`Welcome back ${usernameCookie} 😎!`, "green");
        break;
      case "failed":
        notify("Error, check password and email", "red");
        break;

      default:
        break;
    }
  }, [loginStatus]);

  useEffect(() => {
    switch (createPostStatus) {
      case "success":
        notify("Post created!", "green");
        break;
      case "failed":
        notify("Error posting", "red");
        break;

      default:
        break;
    }
  }, [createPostStatus]);

  useEffect(() => {
    switch (deletePostStatus) {
      case "success":
        notify("Post deleted!", "orange");
        break;
      case "failed":
        notify("Error deletting post", "red");
        break;

      default:
        break;
    }
  }, [deletePostStatus]);

  useEffect(() => {
    switch (followUnfollowStatus) {
      case "following":
        notify("following", "green");
        break;
      case "unfollowed":
        notify("Unfollowed", "orange");
        break;
      case "failed":
        notify("Error following", "red");
        break;

      default:
        break;
    }
  }, [followUnfollowStatus]);

  useEffect(() => {
    switch (deleteUserStatus) {
      case "success":
        notify("Account has been deleted.", "orange");
        break;
      case "failed":
        notify("Error deletting account", "red");
        break;

      default:
        break;
    }
  }, [deleteUserStatus]);

  return <div ref={notifier} className="notifier"></div>;
}
