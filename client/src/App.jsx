/* eslint-disable react/prefer-stateless-function */
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import LevelCheck from "./Components/LevelCheckTest/LevelCheck/LevelCheck";
import Test from "./Components/LevelCheckTest/LevelTest/LevelTest";
import ChoiceLevel from "./Components/LevelCheckTest/ChoiceLevel/ChoiceLevel";
import MainPage from "./Components/Main/MainPage/MainPage";
import Login from "./Components/Registration/Login/Login";
import SignUp from "./Components/Registration/SignUp/SignUp";
import Video from "./Components/Video/Video";
import Grammar from "./Components/Grammar/Grammar";
import Reading from "./Components/Reading/Reading";
import Listening from "./Components/Listening/Listening";
import Tests from "./Components/Tests/Tests";
import AboutUs from "./Components/AboutUs/AboutUs";
import Settings from "./Components/Settings/Settings";
import Speaking from "./Components/Speaking/Speaking";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/levelCheck" exact element={<LevelCheck />} />
            <Route path="/levelTest" exact element={<Test />} />
            <Route path="/choiceLevel" exact element={<ChoiceLevel />} />
            <Route path="/video" exact element={<Video />} />
            <Route path="/grammar" exact element={<Grammar />} />
            <Route path="/reading" exact element={<Reading />} />
            <Route path="/listening" exact element={<Listening />} />
            <Route path="/tests" exact element={<Tests />} />
            <Route path="/aboutus" exact element={<AboutUs />} />
            <Route path="/settings" exact element={<Settings />} />
            <Route path="/speaking" exact element={<Speaking />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
