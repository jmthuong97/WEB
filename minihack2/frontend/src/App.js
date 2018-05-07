import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from './axios'
import Home from './components/Home';
import Game from './components/Game';

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  state = {
    players: ["", "", "", ""],
    idGame: null,
  }

  _onCreateNewGame = (players) => {
    // console.log(players)
    axios.post('/newgame', {
      players: players
    })
      .then(data => {
        console.log(data)
        this.setState({ idGame: data.data, players: players })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={(props) => {
            return <Home onCreateNewGame={this._onCreateNewGame} idGame={this.state.idGame} />
          }} />
          <Route path="/games/:id" component={Game} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
