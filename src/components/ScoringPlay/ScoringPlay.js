import React, { Component } from 'react';
import './ScoringPlay.css';
import Feed from '../../util/Feed';

class ScoringPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: null,
      period: null,
      periodTime: null,
      goalsHome: null,
      goalsAway: null,
      strength: null,
      gwg: null,
      eng: null,
      description: null
    }
    this.setInfo = this.setInfo.bind(this);
  }

  setInfo() {
    Feed.getScoringPlay(this.props.scoringPlayId, this.props.gameId).then(scoringPlay => {
      this.setState({
        teamId: scoringPlay.team.id,
        period: scoringPlay.about.ordinalNum,
        periodTime: scoringPlay.about.periodTime,
        goalsHome: scoringPlay.about.goals.home,
        goalsAway: scoringPlay.about.goals.away,
        gwg: scoringPlay.result.gameWinningGoal,
        eng: scoringPlay.result.emptyNet,
        description: scoringPlay.result.description.replace('assists: ', '').replace(', none', '')
      })
      if (scoringPlay.result.strength.code !== 'EVEN') {
        this.setState({
          strength: scoringPlay.result.strength.code
        })
      }
    })
  }

  componentDidMount() {
    this.setInfo();
  }

  render() {
    // console.log("ScoringPlay: render() "+this.props.scoringPlayId);
    return (
      <div className="row">
        <div className="col-xs-2 col-sm-1 text-right scoring-play">{this.state.period !== 'SO' && this.state.goalsHome+'-'+this.state.goalsAway}</div>
        <div className="col-xs-10 col-sm-11"><img src={Feed.getLogo(this.state.teamId)} className="img-small" alt="" />{this.state.periodTime !== '00:00' && this.state.periodTime} <span className="small">{this.state.period} – <em>{this.state.gwg && 'GWG '}{this.state.eng && 'ENG '}{this.state.strength && this.state.strength+' '}</em></span>{this.state.description}</div>
      </div>
    );
  }
}

export default ScoringPlay;