// @flow

import type {Middleware} from 'redux';
import type {RouterHistory} from 'react-router-dom';

import type {Action, Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import dbPromise from 'matchplay/db';
import type {Player, Game} from 'matchplay/model';

const handler = async (action, dispatch) => {
  const db = await dbPromise;
  const tx = db.transaction(['game', 'player'], 'readonly');
  const gameOs = tx.objectStore('game');
  const playerOs = tx.objectStore('player');

  const game : Game | void = await gameOs.get(action.id);

  if (game === undefined) {
    action.history.replace("/");
  } else {

    const players = new Map<number, Player>();
    for (const playerId of game.players) {
      const player = await playerOs.get(playerId);
      if (player !== undefined) {
        players.set(playerId, player);
      }
    }

    dispatch({
              type: 'GAME_FETCHED',
              game,
              gameId: action.id,
              players,
    });
  }
}

const middleware : Middleware<State, Action, Dispatch> =
  store => next => action => {
    if (action.type === 'GAME_INIT') {
      handler(action, store.dispatch);
    }
    return next(action);
  }

export default (dispatch: Dispatch) => (id: number, history: RouterHistory) => {
  dispatch({
    type: 'MIDDLEWARE_ADD',
    name: 'GAME_INIT',
    middleware,
  });
  dispatch({type: 'GAME_INIT', id, history});
}
