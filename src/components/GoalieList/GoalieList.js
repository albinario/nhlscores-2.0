import React, { Component } from 'react';
import Goalie from '../Goalie/Goalie';

class GoalieList extends Component {
  render() {
    // console.log("GoalieList: render()");
    return (
      this.props.goalies.map(goalies => {
        return goalies.map((goalieId, index) => {
          return (
            <Goalie
              key={index}
              goalieId={goalieId}
              teamId={this.props.teamId}
              gameId={this.props.gameId}
              type={this.props.type}
            />
          )
        })
      })
    );
  }
}

export default GoalieList;
