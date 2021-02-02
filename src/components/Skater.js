import React, { Component } from 'react';
import Feed from '../util/Feed';

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
    Feed.getPlayerStats(this.props.skaterId, this.props.gameId, this.props.type).then(skater => {
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
      <tr>
        <td>{this.state.jersey}</td>
        <td className="text-left"><span className="hidden-xs">{this.state.fullName}</span><span className="hidden-sm hidden-md hidden-lg">{this.state.lastName}</span> <span className="pick">{Feed.isPicked(this.props.skaterId)}</span></td>
        <td>{this.state.goals}</td>
        <td>{this.state.assists}</td>
        <td>{(this.state.plusMinus > 0) ? '+' : null }{this.state.plusMinus}</td>
        <td>{this.state.shots}</td>
        <td>{this.state.pim}</td>
        <td>{this.state.hits}</td>
        <td>{this.state.blocked}</td>
        <td className="hidden-5 hidden-6">{this.state.timeOnIce}</td>
      </tr>
    );
  }
}

export default Skater;
