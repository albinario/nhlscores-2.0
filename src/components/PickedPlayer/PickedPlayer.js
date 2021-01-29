import React, { Component } from 'react';
import './PickedPlayer.css';
import Feed from '../../util/Feed';

class PickedPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      lastName: null
    }
    this.setInfo = this.setInfo.bind(this);
  }

  setInfo() {
    Feed.getPlayerInfo(this.props.info.id).then(skater => {
      this.setState({
        fullName: skater.fullName,
        lastName: Feed.getLastName(skater.fullName)
      })
    })
  }

  componentDidMount() {
    this.setInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.info.id !== prevProps.info.id) {
      this.setInfo();
    }
  }

  render() {
    // console.log("ScoringPlay: render() "+this.props.scoringPlayId);
    return (
      <div className="row">
        <div className="col-xs-4 col-sm-2 col-lg-1"><img src={Feed.getLogo(this.props.info.team)} alt="" className="img-small" />{this.props.info.jersey} <span className="small">{this.props.info.pos}</span></div>
        <div className="col-xs-4 col-sm-3 col-md-2 col-lg-2"><span className="hidden-5 hidden-6">{this.state.fullName}</span><span className="hidden-7up">{this.state.lastName}</span></div>
        <div className="col-xs-3">{this.props.info.picker.replace('A', 'Albin').replace('J', 'Jakob').replace('S', 'Sacke').replace('V', 'Ville')}</div>
      </div>
    );
  }
}

export default PickedPlayer;
