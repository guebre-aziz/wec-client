import React, { useState, useEffect } from "react";
import "./post.css";
import { formatDistance } from "date-fns";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import wecAPI from "../../common/axios/wecAPI";
import { useDispatch } from "react-redux";
import { asyncFetchDeletePost } from "../../features/redux/postsSlice";
import { getCookie } from "../../common/cookieMngr";

export default function Post({ post }) {
  const [postUserData, setPostUserData] = useState({});
  const dispatch = useDispatch();
  const cookieUsername = getCookie("username");

  const createdAt = formatDistance(new Date(post.createdAt), new Date(), {
    addSuffix: true,
  });

  const handleDelete = () => {
    let confirm = window.confirm("Delete the post?");
    if (confirm) {
      dispatch(asyncFetchDeletePost(post._id));
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await wecAPI.get(
        `users/${post.username}`,
        {},
        {
          headers: {
            withCredentials: true,
          },
        }
      );
      setPostUserData(res.data);
    };
    fetchUser();
  }, [post.username]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={postUserData.profilePicture}
              crossOrigin="use-credentials"
              alt=""
              className="postProfileImg"
            />
            <div className="postUsername">{post.username}</div>
            <div className="postDate">{createdAt}</div>
          </div>
          <div className="postTopRight">
            {cookieUsername === post.username && (
              <DeleteRoundedIcon
                style={{ color: "var(--light-red)", cursor: "pointer" }}
                onClick={() => handleDelete()}
              />
            )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <div className="postImgWrapper">
            {post.images.map((img) => {
              return (
                <img
                  key={img._id}
                  src={img.path}
                  alt=""
                  crossOrigin="use-credentials"
                  className="postImg"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
