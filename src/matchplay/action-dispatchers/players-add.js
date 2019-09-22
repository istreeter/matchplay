// @flow

import type {Middleware} from 'redux';
import { openDB } from 'idb';

import type {Action, Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import type {Player} from 'matchplay/model';
import dbPromise from 'matchplay/db';

const middleware : Middleware<State, Action, Dispatch> =
  store => next => action => {
    if (action.type === 'PLAYERS_ADD') {
      const player : Player = {
        id: Date.now(),
        name: action.name,
        color: action.color,
        played: 0,
        won: 0,
        precedence: new Date(),
      };
      dbPromise.then(db => {
        const tx = db.transaction('player', 'readwrite');
        const os = tx.objectStore('player');
        os.add(player)
        return tx.complete
      }).then(result =>
        store.dispatch({
          type: 'PLAYERS_ADDED',
          player: player,
        })
      )
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
