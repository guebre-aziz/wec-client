import React, { useState, useEffect } from "react";
import "./profile.css";
import Post from "../../components/post/Post";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncFetchFollowUnfollow,
  asyncFetchNetwork,
  asyncFetchUser,
  asyncFetchUserLogged,
  getFollowUnfollowStatus,
  getNetworkData,
  getUserData,
  getUserLoggedData,
} from "../../features/redux/usersSlice";
import {
  asyncFetchUserPosts,
  getCreatePostStatus,
  getDeletePostStatus,
  getUserPostsData,
} from "../../features/redux/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../common/cookieMngr";
import Users from "../../components/users/Users";
import Share from "../../components/share/Share";

export default function Profile() {
  const [isFollowed, setIsfollowed] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  const usernameCookie = getCookie("username");
  const userLoggedData = useSelector(getUserLoggedData);
  const userData = useSelector(getUserData);
  const posts = useSelector(getUserPostsData);
  const network = useSelector(getNetworkData);
  const postDeleteStatus = useSelector(getDeletePostStatus);
  const createPostStatus = useSelector(getCreatePostStatus);
  const followUnfollowStatus = useSelector(getFollowUnfollowStatus);

  const handleUpdateProfileButton = () => {
    navigate("/editProfile");
  };

  const handleFollowUnfollow = () => {
    dispatch(asyncFetchFollowUnfollow(username));
  };

  useEffect(() => {
    if (!usernameCookie) {
      navigate("/login");
    }
  });

  useEffect(() => {
    dispatch(asyncFetchNetwork(username));
    if (usernameCookie === username) {
      dispatch(asyncFetchUser(usernameCookie));
    } else {
      dispatch(asyncFetchUser(username));
    }
  }, [username]);

  useEffect(() => {
    dispatch(asyncFetchUserPosts(username));
  }, [username, postDeleteStatus, createPostStatus]);

  useEffect(() => {
    if (userLoggedData.followings?.includes(userData?.username)) {
      setIsfollowed(false);
    } else {
      setIsfollowed(true);
    }
  }, [network, userData, followUnfollowStatus]);

  useEffect(() => {
    dispatch(asyncFetchUserLogged());
    dispatch(asyncFetchNetwork(username));
  }, [followUnfollowStatus]);

  return (
    <>
      {userData && (
        <div className="mainContainer">
          <div className="profile">
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    src={userData.coverPicture}
                    crossOrigin="use-credentials"
                    alt=""
                    className="profileCoverImg"
                  />
                  <img
                    src={userData.profilePicture}
                    crossOrigin="use-credentials"
                    alt=""
                    className="profileUserImg"
                  />
                </div>
              </div>
              <div className="profileInfo">
                <h1>{userData.username}</h1>
                <p style={{ margin: "5px" }}>
                  {userData.city && userData.city}
                </p>
                <p style={{ margin: "5px" }}>{userData.desc}</p>

                {userData.username === usernameCookie ? (
                  <button
                    className="primaryButton"
                    style={{ margin: "10px" }}
                    onClick={handleUpdateProfileButton}
                  >
                    Update profile
                  </button>
                ) : isFollowed ? (
                  <button
                    className="primaryButton"
                    style={{ margin: "10px" }}
                    onClick={handleFollowUnfollow}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    className="primaryButton"
                    style={{ margin: "10px" }}
                    onClick={handleFollowUnfollow}
                  >
                    Unfollow
                  </button>
                )}
              </div>
              <div className="content">
                {userData.username === usernameCookie && (
                  <div className="feedContainer">
                    {" "}
                    <Share />{" "}
                  </div>
                )}

                <div className="postsContainer">
                  <h3>Post:</h3>
                  {posts.length ? (
                    <div className="posts">
                      {posts?.map((post) => {
                        return <Post key={post._id} post={post} />;
                      })}
                    </div>
                  ) : (
                    <h4>No posts yet</h4>
                  )}
                </div>
                <div className="networkContainer">
                  <div className="followerContainer">
                    <h3>Followers:</h3>
                    {network.followers?.length ? (
                      <Users users={network.followers} />
                    ) : (
                      <h4>No Followers</h4>
                    )}
                  </div>
                  <div className="followingsContainer">
                    <h3>Followings:</h3>
                    {network.followings?.length ? (
                      <Users users={network.followings} />
                    ) : (
                      <h4>No Followings</h4>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
