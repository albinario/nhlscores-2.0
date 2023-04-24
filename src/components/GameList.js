import React, { Component } from 'react';
import Game from './Game';

class GameList extends Component {
  render() {
    console.log("GameList: render()");
    return (
      this.props.games ?
        this.props.games.map((game, index) => {
          const picks = this.props.picks.filter(p => p.team === game.homeTeamId || p.team === game.awayTeamId)
          return (
            <Game
              key={index}
              game={game}
              picks={picks}
            />
          );
        })
      :
      <div className="header">
        {this.props.message}
      </div>
    );
  }
}

export default GameList;
