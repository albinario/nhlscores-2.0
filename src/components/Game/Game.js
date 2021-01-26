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
          {this.props.game.playedStatus &&
            <p className="text-center small"><span className={chevronFirst}></span></p>
          }
        </div>
          {this.props.game.playedStatus &&
            <Collapse in={this.state.expandFirst} onClick={() => (this.setState({expandSecond: !this.state.expandSecond}))}>
              <div>
                <ScoringPlayList
                  gameId={this.props.game.gameId}
                  scoringPlays={this.props.game.scoringPlays}
                />
                <br/>
                <div className="row text-center small">
                  <div className="col-xs-1"></div>
                  <div className="col-xs-6 col-sm-2"></div>
                  <div className="col-xs-2 col-sm-1"><strong>Saves</strong></div>
                  <div className="hidden-xs col-sm-1"><strong>%</strong></div>
                  <div className="hidden-xs col-sm-1"><strong>PP</strong></div>
                  <div className="hidden-xs col-sm-1"><strong>SH</strong></div>
                  <div className="hidden-xs col-sm-1"><strong>TOI</strong></div>
                  <div className="hidden-xs col-sm-1"><strong>G</strong></div>
                  <div className="hidden-xs col-sm-1"><strong>A</strong></div>
                  <div className="col-xs-2 col-sm-1"><strong>PIM</strong></div>
                </div>
                <GoalieList
                  goalies={this.props.game.awayGoalies}
                  teamId={this.props.game.awayTeamId}
                  gameId={this.props.game.gameId}
                  picks={this.props.game.awayPicks.filter(pick => pick.pos === "G")}
                  type='away'
                />
                <GoalieList
                  goalies={this.props.game.homeGoalies}
                  teamId={this.props.game.homeTeamId}
                  gameId={this.props.game.gameId}
                  picks={this.props.game.homePicks.filter(pick => pick.pos === "G")}
                  type='home'
                />
                <br/>
                <p className="text-center small"><span className={chevronSecond}></span></p>
                <Collapse in={this.state.expandSecond}>
                  <div>
                    <SkaterList
                      skaters={this.props.game.awaySkaters}
                      teamId={this.props.game.awayTeamId}
                      gameId={this.props.game.gameId}
                      picks={this.props.game.awayPicks.filter(pick => pick.pos !== "G")}
                      type='away'
                    />
                    <br/>
                    <SkaterList
                      skaters={this.props.game.homeSkaters}
                      teamId={this.props.game.homeTeamId}
                      gameId={this.props.game.gameId}
                      picks={this.props.game.homePicks.filter(pick => pick.pos !== "G")}
                      type='home'
                    />
                  </div>
                </Collapse>
              </div>
            </Collapse>
          }
      </div>
    )
  }
}

export default Game;
