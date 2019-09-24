// @flow

import type {Middleware} from 'redux';

import type {Action, Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import dbPromise from 'matchplay/db';

const handler = async (action, dispatch) => {
  const db = await dbPromise;
  const tx = db.transaction('game', 'readonly');
  const os = tx.store;
  let cursor = await os.index('date').openCursor(undefined, 'prev');
  const games = new Map();
  while (cursor && games.size < 10) {
    games.set(cursor.primaryKey, cursor.value);
    cursor = await cursor.continue();
  }
  dispatch({
            type: 'ARCHIVE_FETCHED',
            games,
  });
}

const middleware : Middleware<State, Action, Dispatch> =
  store => next => action => {
    if (action.type === 'ARCHIVE_INIT') {
      handler(action, store.dispatch);
    }
    return next(action);
  }

export default (dispatch: Dispatch) => () => {
  dispatch({
    type: 'MIDDLEWARE_ADD',
    name: 'ARCHIVE_INIT',
    middleware,
  });
  dispatch({type: 'ARCHIVE_INIT'});
}

