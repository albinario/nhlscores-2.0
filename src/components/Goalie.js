import React, { Component } from 'react';
import Feed from '../util/Feed';

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
		Feed.getPlayerStats(this.props.goalieId, this.props.gameId, this.props.type).then(goalie => {
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
			<tr>
				<td className=""><img src={Feed.getLogo(this.props.teamId)} className="img-small" alt="" /></td>
				<td>{this.state.jersey}</td>
				<td className="text-left">
					<span className="hidden-xs hidden-sm">{this.state.fullName}</span>
					<span className="hidden-md hidden-lg">{this.state.lastName}</span> {this.state.decision}
					<span className="pick">{this.props.pickedBy}</span>
				</td>
				<td>{this.state.saves}/{this.state.shots}</td>
				<td className="hidden-5 hidden-6">{this.state.savePercentage}</td>
				<td className="hidden-5 hidden-6">{this.state.savesPP}/{this.state.shotsPP}</td>
				<td className="hidden-5 hidden-6">{this.state.savesSH}/{this.state.shotsSH}</td>
				<td className="hidden-5 hidden-6">{this.state.timeOnIce}</td>
				<td className="hidden-5 hidden-6">{this.state.goals}</td>
				<td>{this.state.assists}</td>
				<td>{this.state.pim}</td>
			</tr>
		);
	}
}

export default Goalie;
