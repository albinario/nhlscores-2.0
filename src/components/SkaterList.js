import React, { Component } from 'react';
import Skater from './Skater';
import Feed from '../util/Feed';

class SkaterList extends Component {
	render() {
		// console.log("SkaterList: render() for game: "+this.props.gameId);
		return (
			<div className="row">
				<div className="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2">
					<table className="table text-center">
						<thead>
							<tr className="bold">
								<td></td>
								<td className="text-left"><img src={Feed.getLogo(this.props.teamId)} className="img-small" alt="" /></td>
								<td>G</td>
								<td>A</td>
								<td>+/-</td>
								<td>S</td>
								<td>PIM</td>
								<td>H</td>
								<td>B</td>
								<td className="hidden-5 hidden-6">TOI | PP | SH</td>
							</tr>
						</thead>
						<tbody>
							{
								this.props.skaters.map(skaters => {
									return skaters.map((skaterId, index) => {
										let pickedBy = ""
										if (this.props.picks.find(p => p.id === skaterId)) {
											pickedBy = this.props.picks.find(p => p.id === skaterId).picker
										}
										return (
											<Skater
												key={index}
												skaterId={skaterId}
												teamId={this.props.teamId}
												gameId={this.props.gameId}
												type={this.props.type}
												pickedBy={pickedBy}
											/>
										)
									})
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default SkaterList;
