import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import LevelCheck from "./Components/LevelCheckTest/LevelCheck/LevelCheck";
import Test from "./Components/LevelCheckTest/LevelTest/LevelTest";
import ChoiceLevel from "./Components/LevelCheckTest/ChoiceLevel/ChoiceLevel";
import MainPage from "./Components/Main/MainPage/MainPage";
import Login from "./Components/Registration/Login/Login";
import ResetPassword from "./Components/Registration/ResetPassword/ResetPassword";
import SignUp from "./Components/Registration/SignUp/SignUp";
import Video from "./Components/Video/Video";
import Grammar from "./Components/Grammar/Grammar";
import Reading from "./Components/Reading/Reading";
import Listening from "./Components/Listening/Listening";
import Tests from "./Components/Tests/Tests";
import AboutUs from "./Components/AboutUs/AboutUs";
import Settings from "./Components/Settings/Settings";
import Speaking from "./Components/Speaking/Speaking";
import { AuthProvider } from "./Components/Registration/AuthContext/AuthContext";
import PrivateRoute from "./Components/Registration/PrivateRoute/PrivateRoute";
import styles from "./App.module.scss";
function App() {

  const [isDark, setisDark] = useState(false);
  useEffect(() => {
    setisDark("true" === localStorage.getItem('Theme'));

    window.addEventListener('storage', () => {
      setisDark("true" === localStorage.getItem('Theme'));
    });

    return () => {
      window.removeEventListener('storage', () => { });
    };
  }, []);

  return (
    <div className={`${isDark ? styles.darkTheme : styles.lightTheme}`}>
      <Router >
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" exact element={<MainPage isDarkTheme={isDark} />} />
              <Route path="/levelCheck" exact element={<LevelCheck isDarkTheme={isDark} />} />
              <Route path="/levelTest" exact element={<Test isDarkTheme={isDark} />} />
              <Route path="/choiceLevel" exact element={<ChoiceLevel isDarkTheme={isDark} />} />
              <Route path="/video" exact element={<Video isDarkTheme={isDark} />} />
              <Route path="/grammar" exact element={<Grammar isDarkTheme={isDark} />} />
              <Route path="/reading" exact element={<Reading isDarkTheme={isDark} />} />
              <Route path="/listening" exact element={<Listening isDarkTheme={isDark} />} />
              <Route path="/tests" exact element={<Tests isDarkTheme={isDark} />} />
              <Route path="/aboutus" exact element={<AboutUs isDarkTheme={isDark} />} />
              <Route path="/settings" exact element={<Settings isDarkTheme={isDark} />} />
              <Route path="/speaking" exact element={<Speaking isDarkTheme={isDark} />} />
            </Route>
            <Route path="/reset-password" element={<ResetPassword isDarkTheme={isDark} />} />
            <Route path="/login" element={<Login isDarkTheme={isDark} />} />
            <Route path="/signup" element={<SignUp isDarkTheme={isDark} />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
