import React, { Component } from 'react';
import Feed from '../../util/Feed';

class Skater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      lastName: null,
      jersey: null,
      goals: null,
      assists: null,
      plusMinus: null,
      shots: null,
      hits: null,
      pim: null,
      blocked: null,
      timeOnIce: null,
      timeOnIcePP: null,
      timeOnIceSH: null
    }
    this.setInfo = this.setInfo.bind(this);
  }

  setInfo() {
    Feed.getPlayer(this.props.skaterId, this.props.gameId, this.props.type).then(skater => {
      this.setState({
        fullName: skater.person.fullName,
        lastName: Feed.getLastName(skater.person.fullName),
        jersey: skater.jerseyNumber
      })
      if (skater.stats.skaterStats) {
        this.setState({
          goals: skater.stats.skaterStats.goals,
          assists: skater.stats.skaterStats.assists,
          plusMinus: skater.stats.skaterStats.plusMinus,
          shots: skater.stats.skaterStats.shots,
          hits: skater.stats.skaterStats.hits,
          pim: skater.stats.skaterStats.penaltyMinutes,
          blocked: skater.stats.skaterStats.blocked,
          timeOnIce: skater.stats.skaterStats.evenTimeOnIce+' | '+skater.stats.skaterStats.powerPlayTimeOnIce+' | '+skater.stats.skaterStats.shortHandedTimeOnIce
        })
      }
    })
  }

  componentDidMount() {
    this.setInfo();
  }

  render() {
    // console.log("Skater: render() "+this.props.skaterId);
    return (
      <div className="row text-center">
        <div className="col-xs-1 text-right">{this.state.jersey}</div>
        <div className="col-xs-4 col-sm-2 text-left"><span className="hidden-xs hidden-sm">{this.state.fullName}</span><span className="hidden-md hidden-lg">{this.state.lastName}</span></div>
        <div className="col-xs-1">{this.state.goals}</div>
        <div className="col-xs-1">{this.state.assists}</div>
        <div className="col-xs-1">{(this.state.plusMinus > 0) ? '+' : '' }{this.state.plusMinus}</div>
        <div className="col-xs-1">{this.state.shots}</div>
        <div className="col-xs-1">{this.state.pim}</div>
        <div className="hidden-xs col-sm-1">{this.state.hits}</div>
        <div className="hidden-xs col-sm-1">{this.state.blocked}</div>
        <div className="hidden-xs hidden-sm col-md-2">{this.state.timeOnIce}</div>
      </div>
    );
  }
}

export default Skater;
