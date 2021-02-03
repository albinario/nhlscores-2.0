import Connect from './Connect';
import Picks from './Picks';

const Feed = {
  async getGames(date) {
    return Connect.scheduleAPI(date).then(jsonResponse => {
      return jsonResponse.dates[0].games.map(game => {
        let startTime = '';
        let gameFinal = false;
        let gamePostponed = false;
        if (game.status.detailedState === "Final") {
          gameFinal = true;
        } else if (game.status.detailedState === "Postponed") {
          gamePostponed = true;
        }
        const homeRecord = game.teams.home.leagueRecord.wins+'-'+game.teams.home.leagueRecord.losses+'-'+game.teams.home.leagueRecord.ot;
        const awayRecord = game.teams.away.leagueRecord.wins+'-'+game.teams.away.leagueRecord.losses+'-'+game.teams.away.leagueRecord.ot;
        let homeGoalies = [];
        let awayGoalies = [];
        let homeSkaters = [];
        let awaySkaters = [];
        let scoringPlays = [];
        let winningTeam = 0;
        if (gameFinal) {
          this.getGameInfo(game.gamePk).then(gameInfo => {
            homeGoalies.push(gameInfo.homeGoalies);
            awayGoalies.push(gameInfo.awayGoalies);
            homeSkaters.push(gameInfo.homeSkaters);
            awaySkaters.push(gameInfo.awaySkaters);
            scoringPlays.push(gameInfo.scoringPlays);
          });
          if (game.teams.home.score > game.teams.away.score) {
            winningTeam = game.teams.home.team.id;
          } else {
            winningTeam = game.teams.away.team.id;
          }
        } else {
          const gameDate = new Date(game.gameDate);
          const hh = ('0' + gameDate.getHours()).slice(-2);
          const mm = ('0' + gameDate.getMinutes()).slice(-2);
          startTime = hh+':'+mm;
        }
        return {
          gameId: game.gamePk,
          startTime: startTime,
          homeTeamId: game.teams.home.team.id,
          homeRecord: homeRecord,
          homeScore: game.teams.home.score,
          homeGoalies: homeGoalies,
          homeSkaters: homeSkaters,
          homePicks: Picks.filter(pick => pick.team === game.teams.home.team.id),
          awayTeamId: game.teams.away.team.id,
          awayRecord: awayRecord,
          awayScore: game.teams.away.score,
          awayGoalies: awayGoalies,
          awaySkaters: awaySkaters,
          awayPicks: Picks.filter(pick => pick.team === game.teams.away.team.id),
          gameFinal: gameFinal,
          scoringPlays: scoringPlays,
          winningTeam: winningTeam,
          gamePostponed: gamePostponed
        }
      });
    }).catch(err => {
      console.log(err);
    });
  },
  getGameInfo(gameId) {
    return Connect.gameAPI(gameId).then(jsonResponse => {
      if (jsonResponse) {
        return {
          awayGoalies: jsonResponse.liveData.boxscore.teams.away.goalies,
          homeGoalies: jsonResponse.liveData.boxscore.teams.home.goalies,
          awaySkaters: jsonResponse.liveData.boxscore.teams.away.skaters,
          homeSkaters: jsonResponse.liveData.boxscore.teams.home.skaters,
          scoringPlays: jsonResponse.liveData.plays.scoringPlays
        }
      }
    }).catch(err => {
      console.log(err);
    })
  },
  getPlayerStats(playerId, gameId, type) {
    return Connect.gameAPI(gameId).then(jsonResponse => {
      if (jsonResponse) {
        return jsonResponse.liveData.boxscore.teams[type].players['ID'+playerId];
      }
    }).catch(err => {
      console.log(err);
    })
  },
  getPlayerInfo(playerId) {
    return Connect.peopleAPI(playerId).then(jsonResponse => {
      if (jsonResponse) {
        return jsonResponse.people[0];
      }
    }).catch(err => {
      console.log(err);
    })
  },
  getLastName(name) {
    let n = name.split(" ");
    return n[n.length-1];
  },
  getScoringPlay(scoringPlayId, gameId) {
    return Connect.gameAPI(gameId).then(jsonResponse => {
      if (jsonResponse) {
        return jsonResponse.liveData.plays.allPlays[scoringPlayId];
      }
    }).catch(err => {
      console.log(err);
    })
  },
  getTeam(teamId) {
    return Connect.teamAPI(teamId).then(jsonResponse => {
      if (jsonResponse) {
        return jsonResponse.teams[0];
      }
    }).catch(err => {
      console.log(err);
    })
  },
  getExtra(gameId) {
    return Connect.gameAPI(gameId).then(jsonResponse => {
      if (jsonResponse) {
        return jsonResponse.liveData.linescore.currentPeriodOrdinal;
      }
    }).catch(err => {
      console.log(err);
    })
  },
  getLogo(teamId) {
    if (teamId) {
      return 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/'+teamId+'.svg';
    }
  },
  isPicked(playerId) {
    const pick = Picks.filter(pick => pick.id === playerId)[0];
    if (pick) {
      return ' '+pick.picker;
    } else {
      return '';
    }
  }
}

export default Feed;
