// @flow

import type {Middleware} from 'redux';

import type {Action, Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import type {Game} from 'matchplay/model';
import dbPromise from 'matchplay/db';

const calculateWinner = (holes: $ReadOnlyArray<$ReadOnlyMap<number, number>>) : number | void => {
  const summed =
    holes.reduce((acc, hole) => {
      for (const [playerId, score] of hole) {
        const oldScore = acc.get(playerId);
        acc.set(playerId, oldScore ? score + oldScore : score);
      }
      return acc;
    }, new Map());
  const sorted = [...summed]
    .sort(([aId, aScore], [bId, bScore]) => bScore - aScore);
  return sorted[0] && sorted[0][0];
}

const handler = async (action, dispatch) => {
  const db = await dbPromise;
  const tx = db.transaction('game', 'readwrite');
  const os = tx.store;

  const oldGame : Game | void = await os.get(action.gameId);

  if (oldGame !== undefined && oldGame.holes.length === action.holeIndex) {
    const holes = [...oldGame.holes, action.scores];
    const winner = holes.length === 18 ? calculateWinner(holes) : undefined;
    const game : Game = {...oldGame, holes, winner};
    await os.put(game, action.gameId);
    await tx.complete;
    dispatch({
      type: 'GAME_UPDATED',
      game,
      gameId: action.gameId,
    });
  }
}

const middleware : Middleware<State, Action, Dispatch> =
  store => next => action => {
    if (action.type === 'HOLES_ADD') {
      handler(action, store.dispatch);
    }
    return next(action);
  }

export default (dispatch: Dispatch) => (gameId: number, holeIndex: number, scores: $ReadOnlyMap<number, number>) => {
  dispatch({
    type: 'MIDDLEWARE_ADD',
    name: 'HOLES_ADD',
    middleware,
  });
  dispatch({
    type: 'HOLES_ADD',
    gameId,
    holeIndex,
    scores,
  });
}
