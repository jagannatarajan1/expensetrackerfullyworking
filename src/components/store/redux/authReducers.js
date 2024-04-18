import { createSlice } from "@reduxjs/toolkit";

const loginToken = localStorage.getItem("IdToken");
const isLogIn = !!loginToken;

const InitialState = {
  logintoken: loginToken,
  UserLogIn: isLogIn,
};
console.log(InitialState);
export const authreducers = createSlice({
  name: "authreducers",
  initialState: InitialState,
  reducers: {
    login: (state, action) => {
      state.logintoken = action.payload.idToken;
      localStorage.setItem("IdToken", action.payload.idToken);
      const email = action.payload.email.replace("@gmail.com", "");
      localStorage.setItem("Email", email);
      state.UserLogIn = !!action.payload.idToken;
      console.log(action.payload);

      state.logintoken = action.payload.idToken;
      console.log(InitialState);
    },
  },
});
export const authAction = authreducers.actions;
