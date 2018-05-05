import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from './axios'
import Home from './components/Home';
import Game from './components/Game';


class App extends Component {
  state = {
    players: ["", "", "", ""],
    initializing: true
  }

  _onCreateNewGame = (players) => {
    this.setState({ initializing: false })
    this.setState({ players: players })
    console.log(players)
    axios.post('/newgame', {
      players: players
    })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        {this.state.initializing ? <Home onCreateNewGame={this._onCreateNewGame} /> : <Game players={this.state.players} />}
      </div>
    );
  }
}

export default App;
