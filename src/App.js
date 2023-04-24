import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import Feed from './util/Feed';
import Header from './components/Header';
import GameList from './components/GameList';
import { getPicks } from './util/PicksFeed';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      picks: [],
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

  async componentDidMount() {
    Feed.getGames(moment().subtract(1, 'days').format("YYYY-MM-DD")).then(games => {
      this.setState({
        games: games,
        message: 'No games scheduled this day'
      })
    });
    this.setState({
      picks: await getPicks()
    })
  }

  render() {
    console.log("App: render()");
    return (
      <div className="container">
        <Header onDateChange={this.onDateChange} />
        <GameList games={this.state.games} picks={this.state.picks} message={this.state.message} />
        <span className="pull-right white">Albin Lindeborg <span className="glyphicon glyphicon-copyright-mark"></span> 2023<br/>All rights reserved</span>
      </div>
    );
  }
}

export default App;
