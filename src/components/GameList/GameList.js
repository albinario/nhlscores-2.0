import React, { Component } from 'react';
import Game from '../Game/Game';

class GameList extends Component {
  render() {
    console.log("GameList: render()");
    return (
      this.props.games.length > 0 ?
        this.props.games.map((game, index) => {
          return (
            <Game
              key={index}
              game={game}
            />
          );
        })
      :
      <div>
        {this.props.message}
      </div>
    );
  }
}

export default GameList;
