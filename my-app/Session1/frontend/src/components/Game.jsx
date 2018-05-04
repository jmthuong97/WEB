import React, { Component } from 'react';

class View extends Component {
    state = {
        rounds: [
            [1, 2, 3, 4]
        ]
    }

    handleScoreChange = (roundIndex, scoreIndex, value) => {
        const rounds = this.state.rounds.map((roundIndex, index) => {
            if (roundIndex === index) {
                const scores = roundIndex.map((score, vtScore) => vtScore===scoreIndex ? value: score)
            }
        })
        this.setState({rounds: rounds})
    }

    render() {
        const namePlayer = this.props.players.map((name, index) => (
            <td>{name}</td>
        ))

        const rounds = this.state.rounds.map((roundIndex, index) => {
            const scores = roundIndex.map((score, scoreIndex) => (
                <td>
                    <input type="number" class="change" value={score} onChange={(event) => this.handleScoreChange} />
                </td>
            ));

            return (<tr>
                <td>Round {index + 1}</td>
                {scores}
            </tr>);
        })

        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-6">
                        <div class="title">
                            <h2>ScoreKeeper</h2>
                        </div>
                        <div class="main">
                            <div class="main-score">
                                <input type="hidden" id="noRound" />
                                <table id="customers">
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            {namePlayer}
                                        </tr>
                                        <tr>
                                            <th>Sum of Score(0)</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        {rounds}
                                    </tbody>
                                </table>
                                <div class="addround">
                                    <input type="button" value="ADD ROUND" onclick="addRound()" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3"></div>
                </div>
            </div>
        );
    }
}

export default View;