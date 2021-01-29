import Config from './Config';

const Connect = {
  scheduleAPI(date) {
    return fetch(`${Config.apiUrl}schedule?date=${date}`).then(response => {
      return response.json();
    })
  },
  gameAPI(gameId) {
    return fetch(`${Config.apiUrl}game/${gameId}/feed/live`).then(response => {
      return response.json();
    })
  },
  teamAPI(teamId) {
    return fetch(`${Config.apiUrl}teams?teamId=${teamId}`).then(response => {
      return response.json();
    })
  },
  peopleAPI(playerId) {
    return fetch(`${Config.apiUrl}people/${playerId}`).then(response => {
      return response.json();
    })
  }
}

export default Connect;
