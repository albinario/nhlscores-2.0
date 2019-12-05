import React, { Component } from 'react';
import Skater from '../Skater/Skater';
import Feed from '../../util/Feed';

class SkaterList extends Component {
  render() {
    // console.log("SkaterList: render() for game: "+this.props.gameId);
    return (
      <div>
        <div className="row text-center small">
          <div className="col-xs-1"></div>
          <div className="col-xs-4 col-sm-2 text-left"><img src={Feed.getLogo(this.props.teamId)} className="img-small" alt="" /></div>
          <div className="col-xs-1"><strong>G</strong></div>
          <div className="col-xs-1"><strong>A</strong></div>
          <div className="col-xs-1"><strong>+/-</strong></div>
          <div className="col-xs-1"><strong>S</strong></div>
          <div className="col-xs-1"><strong>PIM</strong></div>
          <div className="hidden-xs col-sm-1"><strong>H</strong></div>
          <div className="hidden-xs col-sm-1"><strong>B</strong></div>
          <div className="hidden-xs hidden-sm col-md-2"><strong>TOI | PP | SH</strong></div>
        </div>
      {
        this.props.skaters.map(skaters => {
          return skaters.map((skaterId, index) => {
            return (
              <Skater
                key={index}
                skaterId={skaterId}
                teamId={this.props.teamId}
                gameId={this.props.gameId}
                type={this.props.type}
              />
            )
          })
        })
      }
      </div>
    );
  }
}

export default SkaterList;
