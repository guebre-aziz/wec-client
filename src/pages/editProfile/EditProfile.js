import React, { useState, useEffect } from "react";
import "./editProfile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDeleteUser,
  asyncUpdateUser,
  getDeleteUserStatus,
  getUserData,
  resetDeleteUserStatus,
  setLoginStatus,
} from "../../features/redux/usersSlice";
import { getCookie } from "../../common/cookieMngr";

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getUserData);
  const deleteUserStatus = useSelector(getDeleteUserStatus);
  const [username, setUsername] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [desc, setDesc] = useState(userData?.desc);
  const [city, setCity] = useState(userData?.city);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);

  const handleInputChange = (e) => {
    const target = e.target.id;
    const value = e.target.value;
    switch (target) {
      case "emailField":
        setEmail(value);
        break;
      case "descField":
        setDesc(value);
        break;
      case "cityField":
        setCity(value);
        break;
      default:
        break;
    }
  };

  const handleProfilePicture = (e) => {
    setProfilePicture(e.target.files[0]);
  };
  const handleCoverPicture = (e) => {
    setCoverPicture(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("desc", desc);
    formData.append("city", city);
    formData.append("profilePicture", profilePicture);
    formData.append("coverPicture", coverPicture);
    dispatch(asyncUpdateUser({ username: username, formData: formData }));

    setTimeout(() => navigate(`/profile/${username}`), 500);
  };

  const handleDeleteAccount = () => {
    let confirm = window.confirm("Delete your account?");
    if (confirm) {
      dispatch(asyncDeleteUser());
    }
  };

  useEffect(() => {
    if (!getCookie("username")) {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (deleteUserStatus == "success") {
      navigate("/register");
    }
    dispatch(setLoginStatus(""));

    return () => {
      dispatch(resetDeleteUserStatus());
    };
  }, [deleteUserStatus]);

  return (
    <div className="editProfile">
      <div className="inputContainer">
        <h2>Update your profile</h2>
        <form onSubmit={handleSubmit} className="inputContainer">
          <label htmlFor="profilePictureField">Profile image</label>
          <input
            id="profilePictureField"
            type="file"
            className="inputStyled"
            onChange={handleProfilePicture}
          />

          <label htmlFor="coverPictureField">Cover image</label>
          <input
            id="coverPictureField"
            type="file"
            className="inputStyled"
            onChange={handleCoverPicture}
          />

          <label htmlFor="emailField">Email</label>
          <input
            id="emailField"
            placeholder="Email"
            type="email"
            className="inputStyled"
            value={email}
            onChange={handleInputChange}
          />

          <label htmlFor="descField">Describe you</label>
          <input
            id="descField"
            placeholder="Describe you"
            type="text-field"
            className="inputStyled"
            value={desc}
            onChange={handleInputChange}
          />

          <label htmlFor="cityField">City</label>
          <input
            id="cityField"
            placeholder="City"
            className="inputStyled"
            value={city}
            onChange={handleInputChange}
          />
        </form>
        <button className="primaryButton" onClick={handleSubmit}>
          Update
        </button>
        <button
          className="primaryButton deleteUserBtn"
          onClick={handleDeleteAccount}
        >
          Delete account
        </button>
      </div>
    </div>
  );
}
