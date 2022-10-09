/* eslint-disable react/prefer-stateless-function */
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Component } from "react";

import LevelCheck from "./Components/LevelCheckTest/LevelCheck/LevelCheck";
import Test from "./Components/LevelCheckTest/LevelTest/LevelTest";
import ChoiceLevel from "./Components/LevelCheckTest/ChoiceLevel/ChoiceLevel";
import MainPage from "./Components/Main/MainPage/MainPage";
import Login from "./Components/Registration/Login/Login";
import SignUp from "./Components/Registration/SignUp/SignUp";
import Video from "./Components/Main/Video/Video";

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
            <Route path="/Video" exact element={<Video />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
