import React, { Component } from 'react';
import './Team.css';
import Feed from '../../util/Feed';

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
    if (this.props.gameId !== prevProps.gameId) {
      this.setInfo();
    }
  }

  render() {
    // console.log("Team: render() " + this.props.name);
    let showExtra = false;
    if (this.props.playedStatus) {
      if (this.state.extra && this.props.winningTeam === this.props.teamId) {
        showExtra = true;
      }
    }

    return (
      <p>
        <img src={Feed.getLogo(this.props.teamId)} alt="" /><span className="hidden-xs">{this.state.city} </span>{this.state.name} <span className="label label-default">{this.props.record}</span>
          {this.props.playedStatus ?
            <span className="pull-right btn btn-default btn-sm">{showExtra && this.state.extra} <strong>{this.props.score}</strong></span>
            :
            this.props.startTime &&
              <span className="pull-right btn btn-default btn-sm">{this.props.startTime}</span>
          }
      </p>
    );
  }
}

export default Team;
