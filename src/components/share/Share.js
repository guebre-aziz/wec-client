import React, { useState, useEffect, useRef } from "react";
import "./share.css";
import { useDispatch, useSelector } from "react-redux";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import {
  asyncFetchUserLogged,
  getUserLoggedData,
} from "../../features/redux/usersSlice";
import {
  asyncfetchCreatePost,
  getCreatePostStatus,
} from "../../features/redux/postsSlice";
import { getCookie } from "../../common/cookieMngr";

export default function Share() {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState("");
  const [postImages, setPostImages] = useState([]);
  const [userLoggedData, setUserLoggedData] = useState({});
  const createPostStatus = useSelector(getCreatePostStatus);
  const userLogged = useSelector(getUserLoggedData);
  const shareInput = useRef(null);

  const handleInputChange = (e) => {
    setDesc(e.target.value);
  };
  const handleImagesField = (e) => {
    setPostImages(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("desc", desc);
    for (let i = 0; i < postImages.length; i++) {
      formData.append("postImages", postImages[i]);
    }
    dispatch(asyncfetchCreatePost(formData));
  };

  useEffect(() => {
    dispatch(asyncFetchUserLogged());
  }, [getCookie("username")]);

  useEffect(() => {
    setUserLoggedData(userLogged);
  }, [getCookie("username"), userLogged]);

  useEffect(() => {
    if (createPostStatus === "success") {
      setDesc("");
      shareInput.current.value = null;
    }
  }, [createPostStatus]);

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={userLoggedData.profilePicture}
            crossOrigin="use-credentials"
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={`What's in your mind ${userLoggedData.username}?`}
            className="shareInput"
            onChange={handleInputChange}
            value={desc}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOption">
            <label htmlFor="imagesFieldId" style={{ cursor: "pointer" }}>
              <CameraAltRoundedIcon style={{ color: "var(--primary)" }} />
              <br />
              <input
                ref={shareInput}
                name="postImages"
                id="imagesFieldId "
                type="file"
                onChange={handleImagesField}
                multiple
                accept="image/png, image/jpg, image/gif, image/jpeg"
              />
            </label>
          </div>
          <button className="shareButton" onClick={handleSubmit}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
