// @flow

import type {Middleware} from 'redux';

import type {Action, Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import type {Player} from 'matchplay/model';
import dbPromise from 'matchplay/db';

const handler = async (action, dispatch) => {
  const player : Player = {
    name: action.name,
    color: action.color,
    played: 0,
    won: 0,
    precedence: new Date(),
  };

  const db = await dbPromise;
  const tx = db.transaction('player', 'readwrite');
  const os = tx.store;

  const playerId = await os.add(player);
  await tx.complete;

  dispatch({
    type: 'PLAYERS_ADDED',
    player,
    playerId,
  })

}

const middleware : Middleware<State, Action, Dispatch> =
  store => next => action => {
    if (action.type === 'PLAYERS_ADD') {
      handler(action, store.dispatch);
    }
    return next(action);
  }

export default (dispatch: Dispatch) => (name: string, color: string) => {
  dispatch({
    type: 'MIDDLEWARE_ADD',
    name: 'PLAYERS_ADD',
    middleware,
  });
  dispatch({
    type: 'PLAYERS_ADD',
    name,
    color,
  });
}
