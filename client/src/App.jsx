/* eslint-disable react/prefer-stateless-function */
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Component } from "react";

import Login from "./Components/Registration/Login/Login";
import SignUp from "./Components/Registration/SignUp/SignUp";
import MainPage from "./Components/Main/MainPage/MainPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
