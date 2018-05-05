import React, { Component } from 'react';

class Home extends Component {

    state = {
        players: ["", "", "", ""],
    }

    handleChange = (index, value) => {
        const noPlayer = this.state.players.map((name, pIndex) => pIndex === index ? value : name);
        this.setState({ players: noPlayer })
    }

    send = () => {
        this.props.onCreateNewGame(this.state.players)
    }

    render() {
        const nameInput = this.state.players.map((name, index) => (
            <input
                type="text"
                placeholder={`Player ${index + 1} `}
                value={name}
                onChange={(event) => this.handleChange(index, event.target.value)}
                key={index}
            />
        ))

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <div className="title">
                            <h2>ScoreKeeper</h2>
                        </div>
                        <div className="main">
                            <form className="main-form">
                                {nameInput}
                                <button type="submit" name="submit" onClick={this.send} >CREATE NEW GAME</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        );
    }
}

export default Home;