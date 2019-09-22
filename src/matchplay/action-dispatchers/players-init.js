// @flow

import type {Middleware} from 'redux';

import type {Action, Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import dbPromise from 'matchplay/db';

const handler = async (action, dispatch) => {
  const db = await dbPromise;
  const tx = db.transaction('player', 'readonly');
  const os = tx.store;
  let cursor = await os.openCursor();
  const players = [];
  while (cursor) {
    players.push({...cursor.value, id: cursor.key});
    cursor = await cursor.continue();
  }
  dispatch({
            type: 'PLAYERS_FETCHED',
            players,
  });
}

const middleware : Middleware<State, Action, Dispatch> =
  store => next => action => {
    if (action.type === 'PLAYERS_INIT') {
      handler(action, store.dispatch);
    }
    return next(action);
  }

export default (dispatch: Dispatch) => () => {
  dispatch({
    type: 'MIDDLEWARE_ADD',
    name: 'PLAYERS_INIT',
    middleware,
  });
  dispatch({type: 'PLAYERS_INIT'});
}
