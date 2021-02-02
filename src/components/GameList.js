import React, { Component } from 'react';
import Game from './Game';

class GameList extends Component {
  render() {
    console.log("GameList: render()");
    return (
      this.props.games ?
        this.props.games.map((game, index) => {
          return (
            <Game
              key={index}
              game={game}
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
