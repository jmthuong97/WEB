import React, { Component } from 'react';

class View extends Component {
    render() {
        const namePlayer = this.props.players.map((name, index) => (
            <td>{name}</td>
        ))

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
                                        <tr>
                                            <td>Round 1</td>
                                            <td>
                                                <input type="number" class="change" required="" />
                                            </td>
                                            <td>
                                                <input type="number" class="change" required="" />
                                            </td>
                                            <td>
                                                <input type="number" class="change" required="" />
                                            </td>
                                            <td>
                                                <input type="number" class="change" required="" />
                                            </td>
                                        </tr>
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