import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wecAPI from "../../common/axios/wecAPI";

export const asyncfetchCreatePost = createAsyncThunk(
  "user/asyncfetchCreatePost",
  async (data) => {
    const res = await wecAPI.post("/posts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      },
    });
    return res.data;
  }
);

export const asyncFetchTimeline = createAsyncThunk(
  "user/asyncFetchTimeline",
  async () => {
    const res = await wecAPI.get(
      "/posts/timeline",
      {},
      { headers: { withCredentials: true } }
    );
    return res.data;
  }
);

export const asyncFetchUserPosts = createAsyncThunk(
  "user/asyncFetchUserPosts",
  async (username) => {
    const res = await wecAPI.get(
      `/posts/${username}`,
      {},
      { headers: { withCredentials: true } }
    );
    return res.data;
  }
);

export const asyncFetchDeletePost = createAsyncThunk(
  "user/asyncFetchDeletePost",
  async (postId) => {
    const res = await wecAPI.delete(`posts/${postId}`, {
      headers: { withCredentials: true },
    });
    return res.data;
  }
);

const initialState = {
  timelineData: [],
  userPostsData: [],

  asyncFetchTimelineStatus: "",
  asyncFetchUserPostsStatus: "",
  asyncfetchCreatePostStatus: "",
  asyncFetchDeletePostStatus: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    //-----
    [asyncfetchCreatePost.pending]: (state, action) => {
      return { ...state, asyncfetchCreatePostStatus: "loading" };
    },
    [asyncfetchCreatePost.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        asyncfetchCreatePostStatus: "success",
      };
    },
    [asyncfetchCreatePost.rejected]: (state, action) => {
      return {
        ...state,
        asyncfetchCreatePostStatus: "failed",
      };
    },

    //-----
    [asyncFetchUserPosts.pending]: (state, action) => {
      return { ...state, asyncFetchUserPostsStatus: "loading" };
    },
    [asyncFetchUserPosts.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userPostsData: payload,
        asyncFetchUserPostsStatus: "success",
      };
    },
    [asyncFetchUserPosts.rejected]: (state, action) => {
      return {
        ...state,
        usersSearchData: [],
        asyncFetchUserPostsStatus: "failed",
      };
    },

    //-----
    [asyncFetchTimeline.pending]: (state, action) => {
      return { ...state, asyncFetchTimelineStatus: "loading" };
    },
    [asyncFetchTimeline.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        timelineData: payload,
        asyncFetchTimelineStatus: "success",
      };
    },
    [asyncFetchTimeline.rejected]: (state, action) => {
      return {
        ...state,
        usersSearchData: [],
        asyncFetchTimelineStatus: "failed",
      };
    },

    //-----
    [asyncFetchDeletePost.pending]: (state, action) => {
      return { ...state, asyncFetchDeletePostStatus: "loading" };
    },
    [asyncFetchDeletePost.fulfilled]: (state, { payload }) => {
      return { ...state, asyncFetchDeletePostStatus: "success" };
    },
    [asyncFetchDeletePost.rejected]: (state, action) => {
      return {
        ...state,
        asyncFetchDeletePostStatus: "failed",
      };
    },
  },
});

export const {} = userSlice.actions;

export const getUserPostsData = (state) => state.posts.userPostsData;
export const getCreatePostStatus = (state) =>
  state.posts.asyncfetchCreatePostStatus;
export const getTimelineData = (state) => state.posts.timelineData;
export const getTimelineStatus = (state) =>
  state.posts.asyncFetchTimelineStatus;
export const getDeletePostStatus = (state) =>
  state.posts.asyncFetchDeletePostStatus;

export default userSlice.reducer;
