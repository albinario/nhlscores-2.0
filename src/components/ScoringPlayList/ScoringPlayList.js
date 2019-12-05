import React, { Component } from 'react';
import ScoringPlay from '../ScoringPlay/ScoringPlay';

class ScoringPlayList extends Component {
  render() {
    // console.log("ScoringPlayList: render() for Game: " + this.props.gameId);
    return (
      this.props.scoringPlays.map(scoringPlays => {
        return scoringPlays.map((scoringPlayId, index) => {
          return (
            <ScoringPlay
              key={index}
              scoringPlayId={scoringPlayId}
              gameId={this.props.gameId}
            />
          )
        })
      })
    )
  }
}

export default ScoringPlayList;
