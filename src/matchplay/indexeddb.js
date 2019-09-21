// @flow
import type {Dispatch, Middleware} from 'redux';
import { openDB } from 'idb';

import type {State} from './state';
import type {Action} from './actions';
import type {Player} from './model';

const dbPromise = openDB('matchplay', 1, {
  upgrade(upgradeDB) {
    if (!upgradeDB.objectStoreNames.contains('player')) {
      upgradeDB.createObjectStore('player', {autoIncrement: true});
    }
    if (!upgradeDB.objectStoreNames.contains('game')) {
      upgradeDB.createObjectStore('game', {autoIncrement: true});
    }
  }
});

export const playersMiddleware : Middleware<State, Action, Dispatch<Action>> =
  store => next => action => {
    switch (action.type) {

      case 'PLAYERS_INIT':
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
        break;


      case 'PLAYERS_ADD':
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
        break;

      default:

    }
    return next(action);
  }
