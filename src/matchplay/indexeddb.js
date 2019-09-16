// @flow
import type {Dispatch, Middleware} from 'redux';
import { openDB } from 'idb';

import type {State} from './reducers';
import type {Action} from './actions';
import type {Player} from './model';

const dbPromise = openDB('matchplay', 1, upgradeDB => {
  if (!upgradeDB.objectStoreNames.contains('player')) {
    const os = upgradeDB.createObjectStore('player', {autoIncrement: true});
  }
  if (!upgradeDB.objectStoreNames.contains('game')) {
    upgradeDB.createObjectStore('game', {autoIncrement: true});
  }
});

export const dbMiddleware : Middleware<State, Action, Dispatch<Action>> =
  store => next => action => {
    switch (action.type) {

      case 'PLAYER_FETCH_ALL':
        const state = store.getState();
        if (state.isFetchingPlayers || state.hasFetchedPlayers) {
          // Drop this action
          return action;
        }
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


      case 'PLAYER_ADD':
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
            type: 'PLAYER_ADDED',
            player: player,
          })
        )
        break;

    }
    return next(action);
  }
