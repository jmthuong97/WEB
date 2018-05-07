import React, { Component } from 'react';
// import $ from 'jquery';
import axios from '../axios'


class Game extends Component {

    state = {
        rounds: [],
        players: ["", "", "", ""],
        pointRound: [],
        sumOfScore: ""
    }

    handleScoreChange = (roundNo, scoreIndex, value) => {
        const rounds = this.state.rounds.map((roundIndex, index) => {
            if (roundNo === index) {
                value = value === '' ? 0 : value
                const scores = roundIndex.map((score, vtScore) => vtScore === scoreIndex ? value : score)
                return scores
            }
            return roundIndex
        })
        // =======
        var totalColumn = 0;
        console.log(this.state.rounds.length)
        for (var i = 2; i < this.state.rounds.length + 2; i++) {
            var x = document.getElementById("customers").rows[i].cells[scoreIndex + 1].children[0].value;
            totalColumn = parseInt(totalColumn, 10) + parseInt(x, 10);
        }
        document.getElementById("customers").rows[1].cells[scoreIndex + 1].innerHTML = totalColumn;
        // ===========
        axios.post('/updateScore', {
            idGame: this.props.match.params.id,
            indexRound: roundNo,
            score: value,
            index: scoreIndex
        })
        this.setState({ 
            rounds: rounds
        })
    }

    addRound = () => {
        console.log(this.props.match.params.id)
        axios.post('/createRound', {
            idGame: this.props.match.params.id
        })
            .then(data => console.log(data))
            .catch(err => console.log(err))
        this.setState({ rounds: [...this.state.rounds, [0, 0, 0, 0]] })
    }

    componentDidMount() {
        axios.get(`/games/${this.props.match.params.id}`)
            .then(data => {
                const getround = data.data.rounds.map((roundIndex) => roundIndex.score)
                this.setState({ 
                    players: data.data.names, 
                    rounds: getround, 
                    pointRound: data.data.total,
                    sumOfScore: data.data.sumOfScore
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const namePlayer = this.state.players.map((name, index) => (
            <td key={index}>{name.name}</td>
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

        const pointRound = this.state.pointRound.map((point, index) => (<th key={index}>{point}</th>))

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
                                            <th>Sum of Score({this.state.sumOfScore})</th>
                                            {pointRound}
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