// @flow

import type {Middleware} from 'redux';
import type {RouterHistory} from 'react-router-dom';

import type {Action, Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import dbPromise from 'matchplay/db';

const handler = async (action, dispatch) => {
  const db = await dbPromise;

  const game = await db.get('game', action.id);
  if (game === undefined) {
    action.history.replace("/");
  } else {
    dispatch({
              type: 'GAME_FETCHED',
              game,
              gameId: action.id,
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
