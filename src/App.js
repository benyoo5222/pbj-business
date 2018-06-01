import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import ClippedDrawer from './main-container.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <ClippedDrawer/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
