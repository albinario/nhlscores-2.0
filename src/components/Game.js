import React, { Component } from 'react';
import Team from './Team';
import ScoringPlayList from './ScoringPlayList';
import GoalieList from './GoalieList';
import SkaterList from './SkaterList';
import PickedPlayer from './PickedPlayer';
import Collapse from 'react-bootstrap/Collapse';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expandFirst: false,
			expandSecond: false
		}
	}

	render() {
		// console.log("Game: render() " + this.props.game.gameId);
		let chevronFirst = "glyphicon glyphicon-chevron-down";
		let chevronSecond = "glyphicon glyphicon-chevron-down";
		if (this.state.expandFirst) {chevronFirst = "glyphicon glyphicon-chevron-up";}
		if (this.state.expandSecond) {chevronSecond = "glyphicon glyphicon-chevron-up";}
		const awayPicks = this.props.picks.filter(p => p.team === this.props.game.awayTeamId).sort((a,b) => a.jersey - b.jersey)
		const homePicks = this.props.picks.filter(p => p.team === this.props.game.homeTeamId).sort((a,b) => a.jersey - b.jersey)
		return (
			<div className="well well-sm">
				<div onClick={() => (this.setState({expandFirst: !this.state.expandFirst}))}>
					<Team
						teamId={this.props.game.awayTeamId}
						record={this.props.game.awayRecord}
						score={this.props.game.awayScore}
						picks={awayPicks}
						final={this.props.game.final}
						winningTeam={this.props.game.winningTeam}
						gameId={this.props.game.gameId}
						startTime={this.props.game.startTime}
						postponed={this.props.game.postponed}
					/>
					<Team
						teamId={this.props.game.homeTeamId}
						record={this.props.game.homeRecord}
						score={this.props.game.homeScore}
						picks={homePicks}
						final={this.props.game.final}
						winningTeam={this.props.game.winningTeam}
						gameId={this.props.game.gameId}
					/>
					{(this.props.game.final || this.props.picks.length > 0) && <p className="text-center small"><span className={chevronFirst}></span></p>}
				</div>
				{this.props.game.final ?
					<Collapse in={this.state.expandFirst} onClick={() => (this.setState({expandSecond: !this.state.expandSecond}))}>
						<div>
							<ScoringPlayList
								gameId={this.props.game.gameId}
								scoringPlays={this.props.game.scoringPlays}
								picks={this.props.picks}
							/>
							<br/>
							<div className="row">
								<div className="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2">
									<table className="table text-center">
										<thead>
											<tr className="bold">
												<td></td>
												<td></td>
												<td></td>
												<td>Saves</td>
												<td className="hidden-5 hidden-6">%</td>
												<td className="hidden-5 hidden-6">PP</td>
												<td className="hidden-5 hidden-6">SH</td>
												<td className="hidden-5 hidden-6">TOI</td>
												<td className="hidden-5 hidden-6">G</td>
												<td>A</td>
												<td>PIM</td>
											</tr>
										</thead>
										<tbody>
											<GoalieList
												goalies={this.props.game.awayGoalies}
												teamId={this.props.game.awayTeamId}
												gameId={this.props.game.gameId}
												type='away'
												picks={awayPicks.filter(p => p.pos === "G")}
											/>
											<GoalieList
												goalies={this.props.game.homeGoalies}
												teamId={this.props.game.homeTeamId}
												gameId={this.props.game.gameId}
												type='home'
												picks={homePicks.filter(p => p.pos === "G")}
											/>
										</tbody>
									</table>
								</div>
							</div>
							<br/>
							<p className="text-center small"><span className={chevronSecond}></span></p>
							<Collapse in={this.state.expandSecond}>
								<div>
									<SkaterList
										skaters={this.props.game.awaySkaters}
										teamId={this.props.game.awayTeamId}
										gameId={this.props.game.gameId}
										type='away'
										picks={awayPicks.filter(p => p.pos !== "G")}
									/>
									<br/>
									<SkaterList
										skaters={this.props.game.homeSkaters}
										teamId={this.props.game.homeTeamId}
										gameId={this.props.game.gameId}
										type='home'
										picks={homePicks.filter(p => p.pos !== "G")}
									/>
								</div>
							</Collapse>
						</div>
					</Collapse>
				:
					this.props.picks.length > 0 ?
						<Collapse in={this.state.expandFirst}>
							<div className="row">
								<div className="col-xs-12 col-sm-6 col-md-4">
									<table className="table">
										<tbody>
											{this.props.picks.sort((a,b) => a.team - b.team || a.jersey - b.jersey).map((pick, index) => {
												return (
													<PickedPlayer
														key={index}
														info={pick}
													/>
												)
											})}
										</tbody>
									</table>
								</div>
							</div>
						</Collapse>
					:
						null
				}
			</div>
		)
	}
}

export default Game;
