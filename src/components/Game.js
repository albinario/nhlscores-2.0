import React, { Component } from 'react';
import Team from './Team';
import ScoringPlayList from './ScoringPlayList';
import GoalieList from './GoalieList';
import SkaterList from './SkaterList';
import PickedPlayer from './PickedPlayer';
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
    const allPicks = this.props.game.awayPicks.sort((a,b) => a.jersey-b.jersey).concat(this.props.game.homePicks.sort((a,b) => a.jersey-b.jersey));
    return (
      <div className="well well-sm">
        <div onClick={() => (this.setState({expandFirst: !this.state.expandFirst}))}>
          <Team
            teamId={this.props.game.awayTeamId}
            record={this.props.game.awayRecord}
            score={this.props.game.awayScore}
            picks={this.props.game.awayPicks}
            gameFinal={this.props.game.gameFinal}
            winningTeam={this.props.game.winningTeam}
            gameId={this.props.game.gameId}
            startTime={this.props.game.startTime}
            gamePostponed={this.props.game.gamePostponed}
          />
          <Team
            teamId={this.props.game.homeTeamId}
            record={this.props.game.homeRecord}
            score={this.props.game.homeScore}
            picks={this.props.game.homePicks}
            gameFinal={this.props.game.gameFinal}
            winningTeam={this.props.game.winningTeam}
            gameId={this.props.game.gameId}
          />
          {(this.props.game.gameFinal || allPicks.length > 0) && <p className="text-center small"><span className={chevronFirst}></span></p>}
        </div>
        {this.props.game.gameFinal ?
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
          allPicks.length > 0 ?
            <Collapse in={this.state.expandFirst}>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <table className="table">
                    <tbody>
                      {allPicks.map((pick, index) => {
                        return (
                          <PickedPlayer
                            key={index}
                            info={pick}
                          />
                        )
                      })}
                    </tbody>
                  </table>
                </div>
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
