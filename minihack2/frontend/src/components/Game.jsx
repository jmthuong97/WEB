import React, { Component } from 'react';
// import $ from 'jquery';
import axios from '../axios'


class Game extends Component {

    state = {
        rounds: [],
        players: ["", "", "", ""],
        scoreOfColumn: [],
        sumOfScore: ""
    }

    handleScoreChange = (roundNo, scoreIndex, value) => {
        // update rounds
        const rounds = this.state.rounds.map((roundIndex, index) => {
            if (roundNo === index) {
                value = value === '' ? 0 : value
                const scores = roundIndex.map((score, vtScore) => vtScore === scoreIndex ? parseInt(value, 10) : score)
                return scores
            }
            return roundIndex
        })
        axios.post('/updateScore', {
            idGame: this.props.match.params.id,
            indexRound: roundNo,
            score: value,
            index: scoreIndex
        })

        // calculator total point in column
        var editedValColumn = rounds.map((round, index) => {
            return round[scoreIndex]
        }).reduce((a, b) => a + b, 0) // calculator again that column edited value
        const pointColumn = this.state.scoreOfColumn.map((score, index) => scoreIndex === index ? editedValColumn : score) // total point each coulmn

        this.setState({
            rounds: rounds,
            scoreOfColumn: pointColumn,
            sumOfScore: pointColumn.reduce((a, b) => a + b, 0)
        })
    }

    addRound = () => {
        axios.post('/createRound', {
            idGame: this.props.match.params.id
        })
            .catch(err => console.log(err))
        this.setState({ rounds: [...this.state.rounds, [0, 0, 0, 0]] }) // add more to state
    }

    componentDidMount() {
        axios.get(`/games/${this.props.match.params.id}`)
            .then(data => {
                const getround = data.data.rounds.map((roundIndex) => roundIndex.score)
                this.setState({
                    players: data.data.names,
                    rounds: getround,
                    scoreOfColumn: data.data.total,
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

        const scoreOfColumn = this.state.scoreOfColumn.map((point, index) => (<th key={index}>{point}</th>))

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
                                            {scoreOfColumn}
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