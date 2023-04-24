import React, { Component } from 'react';
import Feed from '../util/Feed';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
      name: null,
      extra: null
    }
    this.setInfo = this.setInfo.bind(this);
  }

  setInfo() {
    Feed.getTeam(this.props.teamId).then(team => {
      this.setState({
        city: team.locationName,
        name: team.teamName
      })
    })
    Feed.getExtra(this.props.gameId).then(extra => {
      if (extra !== '3rd') {
        this.setState({
          extra: extra
        })
      } else {
        this.setState({
          extra: null
        })
      }
    })
  }

  componentDidMount() {
    this.setInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.teamId !== prevProps.teamId) {
      this.setInfo();
    }
  }

  render() {
    // console.log("Team: render() " + this.props.name);
    let showExtra = false;
    if (this.props.final) {
      if (this.state.extra && this.props.winningTeam === this.props.teamId) {
        showExtra = true;
      }
    }

    return (
      <p>
        <img src={Feed.getLogo(this.props.teamId)} alt="" className="img-mgr" />
        <span className="hidden-5 hidden-6">{this.state.city} </span>
        <span className="hidden-5">{this.state.name} </span>
        <span className="label label-default">{this.props.record}</span>
        <span className="label label-default">{this.props.picks.map(pick => pick.picker+pick.jersey).join(', ')}</span>
        {this.props.final ?
          <span className="pull-right btn btn-default btn-sm">{showExtra && this.state.extra} <strong>{this.props.score}</strong></span>
        :
          this.props.postponed ?
            <span className="pull-right btn btn-default btn-sm">Postponed</span>
          :
          this.props.startTime && <span className="pull-right btn btn-default btn-sm">{this.props.startTime}</span>
        }
      </p>
    );
  }
}

export default Team;
