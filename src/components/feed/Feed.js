import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncFetchTimeline,
  getTimelineData,
} from "../../features/redux/postsSlice";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

export default function Feed() {
  const dispatch = useDispatch();
  const timelineData = useSelector(getTimelineData);

  useEffect(() => {
    dispatch(asyncFetchTimeline());
  }, []);

  return (
    <div className="feedContainer">
      <Share />
      {timelineData.length &&
        timelineData.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
    </div>
  );
}
