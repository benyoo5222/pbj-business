import React, { Component } from 'react';
import './App.css';
import ClippedDrawer from './main-container.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <ClippedDrawer/>
      </div>
    );
  }
}

export default App;
