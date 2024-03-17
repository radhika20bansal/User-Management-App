import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setMessage } from "./messageSlice";
import { RegisterloginModel } from "../models/userModel";

const user: RegisterloginModel = JSON.parse(localStorage.getItem("user") as string);

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials: RegisterloginModel, thunkAPI) => {
    try {
      const reqresResponse = await axios.post(
        "https://reqres.in/api/register",
        userCredentials
      );
      const response = reqresResponse.data;
      localStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        `${error.message} ${error.response.data.error}` ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials: RegisterloginModel, thunkAPI) => {
    try {
      const reqresResponse = await axios.post(
        "https://reqres.in/api/login",
        userCredentials
      );
      const response = reqresResponse.data;
      if (response.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({ id: Math.floor(Math.random() * (12 - 1 + 1) + 1), token: response.token })
        );
      }
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        `${error.message} ${error.response.data.error}` ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async () => {
      localStorage.removeItem("user");
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
