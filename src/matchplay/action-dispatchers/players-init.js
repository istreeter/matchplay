// @flow

import type {Middleware} from 'redux';

import type {Action, Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import dbPromise from 'matchplay/db';

const middleware : Middleware<State, Action, Dispatch> =
  store => next => action => {
    if (action.type === 'PLAYERS_INIT') {
        dbPromise.then(db => {
          const tx = db.transaction('player', 'readonly');
          const os = tx.objectStore('player');
          return os.getAll();
        }).then(players =>
          store.dispatch({
            type: 'PLAYERS_FETCHED',
            players,
          })
        );
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
