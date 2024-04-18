import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/login/loginForm";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Forgotpassword from "./pages/Forgetpassword";
import "./App.css";

function App() {
  const loginSelector = useSelector((state) => state.auth.UserLogIn);
  console.log(loginSelector);
  const isDarkMode = useSelector((state) => state.expense.darkmode);
  const theme = isDarkMode ? "dark" : "light";

  return (
    <div className={`theme-${theme}`}>
      <Routes>
        <Route
          path="/"
          element={loginSelector ? <Home /> : <Navigate to="/loginpage" />}
        />
        <Route path="/loginpage" element={<LoginForm />} />
        <Route path="/yourprofile" element={<Profile />} />
        <Route path="/Forgotpassword" element={<Forgotpassword />} />
      </Routes>
    </div>
  );
}

export default App;
