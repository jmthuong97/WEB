import React, { Component } from 'react';
import $ from 'jquery';

class Game extends Component {

    state = {
        rounds: [
            [0, 0, 0, 0]
        ]
    }

    handleScoreChange = (roundInput, scoreIndex, value) => {
        const rounds = this.state.rounds.map((roundIndex, index) => {
            if (roundInput === index) {
                value = value === '' ? 0 : value
                const scores = roundIndex.map((score, vtScore) => vtScore === scoreIndex ? value : score)
                return scores
            }
            return roundIndex
        })
        console.log(rounds)
        this.setState({ rounds: rounds })
    }

    addRound = () => {
        this.setState({ rounds: [...this.state.rounds, [0, 0, 0, 0]] })
    }

    componentDidMount() {
        $(document).ready(function () {
            $('#customers').on('change', '.change', function (event) {
                var indexCells = parseInt(event.target.dataset.index, 10) + 1;
                var rowCount = $('#customers tr').length;
                var total = 0;
                for (var i = 2; i < rowCount; i++) {
                    var x = document.getElementById("customers").rows[i].cells[indexCells].children[0].value;
                    total = parseInt(total, 10) + parseInt(x, 10);
                }
                document.getElementById("customers").rows[1].cells[indexCells].innerHTML = total;
            });
        });
    }

    render() {
        const namePlayer = this.props.players.map((name, index) => (
            <td key={index}>{name}</td>
        ))

        const rounds = this.state.rounds.map((roundIndex, index) => {
            const scores = roundIndex.map((score, scoreIndex) => (
                <td key={scoreIndex}>
                    <input type="number" className="change" value={score} data-index={scoreIndex} onChange={(event) => this.handleScoreChange(index, scoreIndex, event.target.value)} />
                </td>
            ));
            return (<tr key={index}>
                <td>Round {index + 1}</td>
                {scores}
            </tr>);
        })

        return (
            <div className="container-fluid" id="app">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <div className="title">
                            <h2>ScoreKeeper</h2>
                        </div>
                        <div className="main">
                            <div className="main-score">
                                <table id="customers">
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            {namePlayer}
                                        </tr>
                                        <tr>
                                            <th>Sum of Score(0)</th>
                                            <th>0</th>
                                            <th>0</th>
                                            <th>0</th>
                                            <th>0</th>
                                        </tr>
                                        {rounds}
                                    </tbody>
                                </table>
                                <div className="addround">
                                    <input type="button" value="ADD ROUND" onClick={this.addRound} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        );
    }
}

export default Game;