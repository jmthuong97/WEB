import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/Home';
import Game from './components/Game';

class App extends Component {
  state = {
    players: ["", "", "", ""],
    initializing: true
  }

  _onCreateNewGame = () => this.setState({initializing: false})

  _setName = (player) => this.setState({players: player})

  render() {
    return (
      <div>
        {this.state.initializing ? <Home onCreateNewGame={this._onCreateNewGame} setName = {this._setName}/> : <Game players = {this.state.players}/>}
      </div>
    );
  }
}

export default App;
