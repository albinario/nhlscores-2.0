import React, { Component } from 'react';
import Feed from '../../util/Feed';

class Goalie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      lastName: null,
      jersey: null,
      decision: null,
      saves: null,
      shots: null,
      savePercentage: null,
      savesPP: null,
      shotsPP: null,
      savesSH: null,
      shotsSH: null,
      timeOnIce: null,
      goals: null,
      assists: null,
      pim: null
    }
    this.setInfo = this.setInfo.bind(this);
  }

  setInfo() {
    Feed.getPlayer(this.props.goalieId, this.props.gameId, this.props.type).then(goalie => {
      this.setState({
        fullName: goalie.person.fullName,
        lastName: Feed.getLastName(goalie.person.fullName),
        jersey: goalie.jerseyNumber
      })
      if (goalie.stats.goalieStats) {
        this.setState({
          decision: goalie.stats.goalieStats.decision ? '('+goalie.stats.goalieStats.decision+')' : null,
          saves: goalie.stats.goalieStats.saves,
          shots: goalie.stats.goalieStats.shots,
          savePercentage: (goalie.stats.goalieStats.savePercentage) ? goalie.stats.goalieStats.savePercentage.toFixed(2) : '-',
          savesPP: goalie.stats.goalieStats.powerPlaySaves,
          shotsPP: goalie.stats.goalieStats.powerPlayShotsAgainst,
          savesSH: goalie.stats.goalieStats.shortHandedSaves,
          shotsSH: goalie.stats.goalieStats.shortHandedShotsAgainst,
          timeOnIce: goalie.stats.goalieStats.timeOnIce,
          goals: goalie.stats.goalieStats.goals,
          assists: goalie.stats.goalieStats.assists,
          pim: goalie.stats.goalieStats.pim
        })
      }
    })
  }

  componentDidMount() {
    this.setInfo();
  }

  render() {
    // console.log("Goalie: render()");
    return (
      <div className="row text-center">
        <div className="col-xs-1 text-right"><img src={Feed.getLogo(this.props.teamId)} className="img-small" alt="" /><span className="hidden-xs hidden-sm"> {this.state.jersey}</span></div>
        <div className="col-xs-6 col-sm-2 text-left"><span className="hidden-xs hidden-sm">{this.state.fullName}</span><span className="hidden-md hidden-lg">{this.state.lastName}</span> {this.state.decision} <span className="pick">{this.props.picks.map(pick => pick.picker)}</span></div>
        <div className="col-xs-2 col-sm-1">{this.state.saves}/{this.state.shots}</div>
        <div className="hidden-xs col-sm-1">{this.state.savePercentage}</div>
        <div className="hidden-xs col-sm-1">{this.state.savesPP}/{this.state.shotsPP}</div>
        <div className="hidden-xs col-sm-1">{this.state.savesSH}/{this.state.shotsSH}</div>
        <div className="hidden-xs col-sm-1">{this.state.timeOnIce}</div>
        <div className="hidden-xs col-sm-1">{this.state.goals}</div>
        <div className="hidden-xs col-sm-1">{this.state.assists}</div>
        <div className="col-xs-2 col-sm-1">{this.state.pim}</div>
      </div>
    );
  }
}

export default Goalie;
