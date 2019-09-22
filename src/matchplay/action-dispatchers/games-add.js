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
  const tx = db.transaction('game', 'readwrite');
  const os = tx.store;

  const game : Game = {
    date: new Date(),
    winner: undefined,
    scores: action.players.map(player => ({
      player: player.id,
      points: [],
    })),
  };

  const id = await os.add(game);
  await tx.complete;
  action.history.push(`/games/${id}`)
}

const middleware : Middleware<State, Action, Dispatch> =
  store => next => action => {
    if (action.type === 'GAMES_ADD') {
      handler(action);
    }
    return next(action);
  }

export default (dispatch: Dispatch) => (players: $ReadOnlyArray<Player>, history: RouterHistory) => {
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
