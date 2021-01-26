import React, { Component } from 'react';
import './Game.css';
import Team from '../Team/Team';
import ScoringPlayList from '../ScoringPlayList/ScoringPlayList';
import GoalieList from '../GoalieList/GoalieList';
import SkaterList from '../SkaterList/SkaterList';
import Collapse from 'react-bootstrap/Collapse';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandFirst: false,
      expandSecond: false
    }
  }

  render() {
    console.log("Game: render() " + this.props.game.gameId);
    let chevronFirst = "glyphicon glyphicon-chevron-down";
    let chevronSecond = "glyphicon glyphicon-chevron-down";
    if (this.state.expandFirst) {chevronFirst = "glyphicon glyphicon-chevron-up";}
    if (this.state.expandSecond) {chevronSecond = "glyphicon glyphicon-chevron-up";}
    // let showChevron = false;
    // if (this.props.game.playedStatus || this.props.game.homePicks.length > 0 || this.props.game.awayPicks.length > 0) {
    //   showChevron = true;
    // }
    return (
      <div className="well well-sm">
        <div onClick={() => (this.setState({expandFirst: !this.state.expandFirst}))}>
          <Team
            teamId={this.props.game.awayTeamId}
            record={this.props.game.awayRecord}
            score={this.props.game.awayScore}
            picks={this.props.game.awayPicks}
            playedStatus={this.props.game.playedStatus}
            winningTeam={this.props.game.winningTeam}
            gameId={this.props.game.gameId}
            startTime={this.props.game.startTime}
          />
          <Team
            teamId={this.props.game.homeTeamId}
            record={this.props.game.homeRecord}
            score={this.props.game.homeScore}
            picks={this.props.game.homePicks}
            playedStatus={this.props.game.playedStatus}
            winningTeam={this.props.game.winningTeam}
            gameId={this.props.game.gameId}
          />
          {this.props.game.playedStatus && <p className="text-center small"><span className={chevronFirst}></span></p>}
        </div>
        {this.props.game.playedStatus ?
          <Collapse in={this.state.expandFirst} onClick={() => (this.setState({expandSecond: !this.state.expandSecond}))}>
            <div>
              <ScoringPlayList
                gameId={this.props.game.gameId}
                scoringPlays={this.props.game.scoringPlays}
              />
              <br/>
              <div className="row">
                <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2">
                  <table className="table text-center">
                    <thead>
                      <tr className="bold">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Saves</td>
                        <td className="hidden-5 hidden-6">%</td>
                        <td className="hidden-5 hidden-6">PP</td>
                        <td className="hidden-5 hidden-6">SH</td>
                        <td className="hidden-5 hidden-6">TOI</td>
                        <td className="hidden-5 hidden-6">G</td>
                        <td>A</td>
                        <td>PIM</td>
                      </tr>
                    </thead>
                    <tbody>
                      <GoalieList
                        goalies={this.props.game.awayGoalies}
                        teamId={this.props.game.awayTeamId}
                        gameId={this.props.game.gameId}
                        type='away'
                      />
                      <GoalieList
                        goalies={this.props.game.homeGoalies}
                        teamId={this.props.game.homeTeamId}
                        gameId={this.props.game.gameId}
                        type='home'
                      />
                    </tbody>
                  </table>
                </div>
              </div>
              <br/>
              <p className="text-center small"><span className={chevronSecond}></span></p>
              <Collapse in={this.state.expandSecond}>
                <div>
                  <SkaterList
                    skaters={this.props.game.awaySkaters}
                    teamId={this.props.game.awayTeamId}
                    gameId={this.props.game.gameId}
                    type='away'
                  />
                  <br/>
                  <SkaterList
                    skaters={this.props.game.homeSkaters}
                    teamId={this.props.game.homeTeamId}
                    gameId={this.props.game.gameId}
                    type='home'
                  />
                </div>
              </Collapse>
            </div>
          </Collapse>
          :
          null
        }
      </div>
    )
  }
}

export default Game;
