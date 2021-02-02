import React, { Component } from 'react';
import Feed from '../util/Feed';

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
      <tr>
        <td><img src={Feed.getLogo(this.props.info.team)} alt="" className="img-small img-mgl" />{this.props.info.jersey}</td>
        <td><span className="hidden-5 hidden-6">{this.state.fullName}</span><span className="hidden-7up">{this.state.lastName}</span> <span className="small">{this.props.info.pos}</span></td>
        <td>{this.props.info.picker.replace('A', 'Albin').replace('J', 'Jakob').replace('S', 'Sacke').replace('V', 'Ville')}</td>
      </tr>
    );
  }
}

export default PickedPlayer;
