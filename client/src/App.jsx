/* eslint-disable react/prefer-stateless-function */
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Component } from "react";

import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import LevelCheck from "./Components/LevelCheck/LevelCheck";
import LevelTest from "./Components/LevelTest/LevelTest";
import ChoiceLevel from "./Components/ChoiceLevel/ChoiceLevel";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/levelCheck" exact element={<LevelCheck />} />
            <Route path="/levelTest" exact element={<LevelTest />} />
            <Route path="/choiceLevel" exact element={<ChoiceLevel />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
