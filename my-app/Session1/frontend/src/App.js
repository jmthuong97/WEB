import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/Home';
import Game from './components/Game';

class App extends Component {
  state = {
    initializing: true
  }
  render() {
    return (
      <div>
        {this.state.initializing ? <Home /> : <Game/>}
      </div>
    );
  }
}

export default App;
