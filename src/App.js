import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import Feed from './util/Feed';
import Header from './components/Header';
import GameList from './components/GameList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      message: 'Loading games...'
    }
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(dateFromHeader) {
    Feed.getGames(dateFromHeader).then(games => {
      this.setState({
        games: games
      })
    });
  }

  componentDidMount() {
    Feed.getGames(moment().subtract(1, 'days').format("YYYY-MM-DD")).then(games => {
      this.setState({
        games: games,
        message: 'No games scheduled this day'
      })
    });
  }

  render() {
    console.log("App: render()");
    return (
      <div className="container">
        <Header onDateChange={this.onDateChange} />
        <GameList games={this.state.games} message={this.state.message} />
        <span className="pull-right white">Albin Lindeborg <span class="glyphicon glyphicon-copyright-mark"></span> 2021<br/>All rights reserved</span>
      </div>
    );
  }
}

export default App;
