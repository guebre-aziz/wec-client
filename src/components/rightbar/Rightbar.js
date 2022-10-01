import React, { useEffect } from "react";
import "./rightbar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncFetchNetwork,
  getNetworkData,
} from "../../features/redux/usersSlice";
import Users from "../../components/users/Users";
import { getCookie } from "../../common/cookieMngr";

export default function Rightbar() {
  const usernameCookie = getCookie("username");
  const dispatch = useDispatch();
  const network = useSelector(getNetworkData);

  useEffect(() => {
    dispatch(asyncFetchNetwork(usernameCookie));
  }, [usernameCookie]);

  return (
    <div className="networkContainer">
      <h3>My network</h3>
      <div className="followerContainer">
        <h4>Followers:</h4>
        {network.followers?.length ? (
          <Users users={network.followers} />
        ) : (
          <p>No Followers</p>
        )}
      </div>
      <div className="followingsContainer">
        <h4>Followings:</h4>
        {network.followings?.length ? (
          <Users users={network.followings} />
        ) : (
          <p>No Followings</p>
        )}
      </div>
    </div>
  );
}
