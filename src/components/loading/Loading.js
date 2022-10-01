import React, { useEffect, useRef } from "react";
import "./loading.css";
import { useSelector } from "react-redux";
import {
  getUserLoginStatus,
  getSignUpStatus,
} from "../../features/redux/usersSlice";
import {
  getCreatePostStatus,
  getDeletePostStatus,
} from "../../features/redux/postsSlice";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

export default function Loading() {
  const loading = useRef(null);
  const loginStatus = useSelector(getUserLoginStatus);
  const signUpStatus = useSelector(getSignUpStatus);
  const createPostStatus = useSelector(getCreatePostStatus);
  const deletePostStatus = useSelector(getDeletePostStatus);

  function isLoading() {
    if (
      (createPostStatus || loginStatus || signUpStatus || deletePostStatus) ==
      "loading"
    ) {
      return true;
    } else return false;
  }

  useEffect(() => {
    if (isLoading()) {
      loading.current.style.display = "block";
    } else {
      loading.current.style.display = "none";
    }
  }, [createPostStatus, loginStatus, signUpStatus, deletePostStatus]);

  return (
    <RefreshRoundedIcon ref={loading} fontSize="large" className="loading" />
  );
}
