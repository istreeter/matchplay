// @flow

import type {Middleware} from 'redux';
import type {RouterHistory} from 'react-router-dom';

import type {Action, Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import type {Game} from 'matchplay/model';
import type {Player} from 'matchplay/model';
import dbPromise from 'matchplay/db';

const handler = async (action) => {
  const db = await dbPromise;
  const tx = db.transaction(['game', 'player'], 'readwrite');
  const os = tx.objectStore('game');

  const game : Game = {
    date: new Date(),
    players: [...action.players.keys()],
    holes: [],
    totals: new Map(Array.from(action.players.keys(), id => [id, 0])),
  };

  const id = await os.add(game);

  // update timestamp on each player
  const playerOs = tx.objectStore('player');
  for (const [playerId, player] of action.players) {
    playerOs.put({...player, date: new Date()}, playerId);
  }

  await tx.complete;
  action.history.push(`/game/${id}/`)
}

const middleware : Middleware<State, Action, Dispatch> =
  store => next => action => {
    if (action.type === 'GAMES_ADD') {
      handler(action);
    }
    return next(action);
  }

export default (dispatch: Dispatch) => (players: $ReadOnlyMap<number, Player>, history: RouterHistory) => {
  dispatch({
    type: 'MIDDLEWARE_ADD',
    name: 'GAMES_ADD',
    middleware,
  });
  dispatch({
    type: 'GAMES_ADD',
    players,
    history,
  });
}
