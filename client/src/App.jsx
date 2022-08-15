/* eslint-disable react/prefer-stateless-function */
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';

import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
