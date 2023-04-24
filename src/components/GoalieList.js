import React, { Component } from 'react';
import Goalie from './Goalie';

class GoalieList extends Component {
  render() {
    // console.log("GoalieList: render()");
    return (
      this.props.goalies.map(goalies => {
        return goalies.map((goalieId, index) => {
          let pickedBy = ""
          if (this.props.picks.find(p => p.id === goalieId)) {
            pickedBy = this.props.picks.find(p => p.id === goalieId).picker
          }
          return (
            <Goalie
              key={index}
              goalieId={goalieId}
              teamId={this.props.teamId}
              gameId={this.props.gameId}
              type={this.props.type}
              pickedBy={pickedBy}
            />
          )
        })
      })
    );
  }
}

export default GoalieList;
