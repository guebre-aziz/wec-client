import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stringify } from "qs";
import wecAPI from "../../common/axios/wecAPI";
import { getCookie, setCookie } from "../../common/cookieMngr";

export const asyncLogin = createAsyncThunk("users/asynclogin", async (data) => {
  const res = await wecAPI.post("auth/login", stringify(data));
  return res.data;
});

export const asyncSignUp = createAsyncThunk(
  "user/asyncSignUp",
  async (data) => {
    const res = await wecAPI.post("auth/register", stringify(data));
    return res.data;
  }
);

export const asyncFetchUserLogged = createAsyncThunk(
  "user/asyncFetchUserLogged",
  async () => {
    const res = await wecAPI.get(
      `users/${getCookie("username")}`,
      {},
      {
        headers: {
          withCredentials: true,
        },
      }
    );
    return res.data;
  }
);

export const asyncFetchUser = createAsyncThunk(
  "user/asyncFetchUser",
  async (username) => {
    const res = await wecAPI.get(
      `users/${username}`,
      {},
      {
        headers: {
          withCredentials: true,
        },
      }
    );
    return res.data;
  }
);

export const asyncFetchSearchUsers = createAsyncThunk(
  "user/asyncFetchSearchUsers",
  async (searchKey) => {
    const res = await wecAPI.get(
      `users/search/${searchKey}`,
      {},
      {
        headers: {
          withCredentials: true,
        },
      }
    );
    return res.data;
  }
);

export const asyncUpdateUser = createAsyncThunk(
  "user/asyncUpdateUser",
  async (data) => {
    const res = await wecAPI.put(`users/${data.username}`, data.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      },
    });

    return res.data;
  }
);

export const asyncfetchCreatePost = createAsyncThunk(
  "user/asyncfetchCreatePost",
  async (data) => {
    const res = await wecAPI.post("/posts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      },
    });
    console.log(res);
    return res.data;
  }
);

export const asyncFetchNetwork = createAsyncThunk(
  "user/asyncFetchNetwork",
  async (username) => {
    const res = await wecAPI.get(`users/network/${username}`, {
      headers: { withCredentials: true },
    });
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

export const asyncFetchFollowUnfollow = createAsyncThunk(
  "user/asyncFetchFollowUnfollow",
  async (username) => {
    const res = await wecAPI.put(`/users/${username}/followUnfollow`, {
      headers: { withCredentials: true },
    });
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

export const asyncDeleteUser = createAsyncThunk(
  "user/asyncDeleteUser",
  async () => {
    const res = await wecAPI.delete("users", {
      headers: { withCredentials: true },
    });
    return res.data;
  }
);

const initialState = {
  userLoggedData: {},
  userData: {},
  usersSearchData: [],
  followersData: [],
  networkData: {},

  asyncLoginStatus: "",
  asyncSignUpStatus: "",
  asyncFetchUserLoggedStatus: "",
  asyncFetchUserStatus: "",
  asyncFetchSearchUsersStatus: "",
  asyncFetchNetworkStatus: "",
  asyncFetchFollowUnfollowStatus: "",
  asyncDeleteUserStatus: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginStatus: (state, { payload }) => {
      state.asyncLoginStatus = payload;
      state.asyncSignUpStatus = payload;
    },
    resetDeleteUserStatus: (state, { payload }) => {
      state.asyncDeleteUserStatus = "";
    },
  },
  extraReducers: {
    [asyncLogin.pending]: (state, action) => {
      return { ...state, asyncLoginStatus: "loading" };
    },
    [asyncLogin.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userData: payload,
        userId: payload.user._id,
        asyncLoginStatus: "success",
      };
    },
    [asyncLogin.rejected]: (state, action) => {
      return { ...state, asyncLoginStatus: "failed" };
    },
    //-----
    [asyncSignUp.pending]: (state, action) => {
      return { ...state, asyncSignUpStatus: "loading" };
    },
    [asyncSignUp.fulfilled]: (state, { payload }) => {
      return { ...state, userId: payload.user, asyncSignUpStatus: "success" };
    },
    [asyncSignUp.rejected]: (state, action) => {
      return { ...state, asyncSignUpStatus: "failed" };
    },
    //-----
    [asyncFetchUserLogged.pending]: (state, action) => {
      return { ...state, asyncFetchUserLoggedStatus: "loading" };
    },
    [asyncFetchUserLogged.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userLoggedData: payload,
        asyncFetchUserLoggedStatus: "success",
      };
    },
    [asyncFetchUserLogged.rejected]: (state, action) => {
      return {
        ...state,
        userLoggedData: [],
        asyncFetchUserLoggedStatus: "failed",
      };
    },
    //-----
    [asyncFetchUser.pending]: (state, action) => {
      return { ...state, asyncFetchUserStatus: "loading" };
    },
    [asyncFetchUser.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userData: payload,
        asyncFetchUserStatus: "success",
      };
    },
    [asyncFetchUser.rejected]: (state, action) => {
      return { ...state, asyncFetchUserStatus: "failed" };
    },
    //-----
    [asyncFetchSearchUsers.pending]: (state, action) => {
      return { ...state, asyncFetchSearchUsersStatus: "loading" };
    },
    [asyncFetchSearchUsers.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        usersSearchData: payload,
        asyncFetchSearchUsersStatus: "success",
      };
    },
    [asyncFetchSearchUsers.rejected]: (state, action) => {
      return {
        ...state,
        usersSearchData: [],
        asyncFetchSearchUsersStatus: "failed",
      };
    },

    //-----
    [asyncFetchNetwork.pending]: (state, action) => {
      return { ...state, asyncFetchNetworkStatus: "loading" };
    },
    [asyncFetchNetwork.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        networkData: payload,
        asyncFetchNetworkStatus: "success",
      };
    },
    [asyncFetchNetwork.rejected]: (state, action) => {
      return {
        ...state,
        asyncFetchNetworkStatus: "failed",
      };
    },

    //-----
    [asyncFetchFollowUnfollow.pending]: (state, action) => {
      return { ...state, asyncFetchFollowUnfollowStatus: "loading" };
    },
    [asyncFetchFollowUnfollow.fulfilled]: (state, { payload }) => {
      return { ...state, asyncFetchFollowUnfollowStatus: payload.message };
    },
    [asyncFetchFollowUnfollow.rejected]: (state, action) => {
      return {
        ...state,
        asyncFetchFollowUnfollowStatus: "failed",
      };
    },

    //-----
    [asyncDeleteUser.pending]: (state, action) => {
      return { ...state, asyncDeleteUserStatus: "loading" };
    },
    [asyncDeleteUser.fulfilled]: (state, { payload }) => {
      return { ...state, asyncDeleteUserStatus: "success" };
    },
    [asyncDeleteUser.rejected]: (state, action) => {
      return {
        ...state,
        asyncDeleteUserStatus: "failed",
      };
    },
  },
});

export const { setLoginStatus, resetDeleteUserStatus } = userSlice.actions;

export const getUserLoginStatus = (state) => state.users.asyncLoginStatus;
export const getSignUpStatus = (state) => state.users.asyncSignUpStatus;
export const getUserLoggedData = (state) => state.users.userLoggedData;
export const getUserData = (state) => state.users.userData;
export const getUsersSearchData = (state) => state.users.usersSearchData;
export const getNetworkData = (state) => state.users.networkData;
export const getNetworkStatus = (state) => state.users.asyncFetchNetworkStatus;
export const getFollowUnfollowStatus = (state) =>
  state.users.asyncFetchFollowUnfollowStatus;
export const getDeleteUserStatus = (state) => state.users.asyncDeleteUserStatus;

export default userSlice.reducer;
