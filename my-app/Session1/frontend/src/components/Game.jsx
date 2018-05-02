import React, { Component } from 'react';

class View extends Component {
  render() {
    return (
        <div class="main-score">
        <input type="hidden" id="noRound" />
        <table id="customers">
            <tbody>
                <tr>
                    <td></td>
                    <td>{this.props.val1}</td>
                    <td>{this.props.val2}</td>
                    <td>{this.props.val3}</td>
                    <td>{this.props.val4}</td>
                </tr>
                <tr>
                    <th>Sum of Score(0)</th>
                    <th></th>
                </tr>
                <tr>
                    <td>Round
                        <input type="hidden" id="idRound" />
                    </td>
                    <td>
                        <input type="number" class="change"  required="" />
                        <input type="number" class="change"  required="" />
                        <input type="number" class="change"  required="" />
                        <input type="number" class="change"  required="" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="addround">
            <input type="button" value="ADD ROUND" onclick="addRound()" />
        </div>
    </div>
    );
  }
}

export default View;