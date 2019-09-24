// @flow

import type {Middleware} from 'redux';

import type {Action, Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import type {Game, Player} from 'matchplay/model';
import dbPromise from 'matchplay/db';

const calculateTotals = (players: $ReadOnlyArray<number>,
                         holes: $ReadOnlyArray<$ReadOnlyMap<number, number>>)
       : $ReadOnlyMap<number, number> =>
  new Map (
    players.map(playerId => {
      const summed =
        holes.reduce((acc, hole) => {
          return acc + (hole.get(playerId) || 0)
        }, 0);
      return [playerId, summed];
    })
  );

const handler = async (action, dispatch) => {
  const db = await dbPromise;
  const tx = db.transaction(['game', 'player'], 'readwrite');
  const gameOs = tx.objectStore('game');
  const playerOs = tx.objectStore('player');

  const oldGame : Game | void = await gameOs.get(action.gameId);

  if (oldGame !== undefined && oldGame.holes.length < 18 && action.holeIndex <= oldGame.holes.length) {
    const holes = [...oldGame.holes];
    holes[action.holeIndex] = action.scores;
    const totals = calculateTotals(oldGame.players, holes);
    const game : Game = {...oldGame, holes, totals};
    await gameOs.put(game, action.gameId);

    const updatePlayers = async() => {
      const players = new Map()
      for (const playerId of game.players) {
        const oldPlayer : Player | void = await playerOs.get(playerId);
        if (oldPlayer === undefined) {
          continue;
        }

        const score = totals.get(playerId) || 0;
        const isWinner = [...totals.values()].every(score2 => score2 <= score);

        const player = {
          ...oldPlayer,
          played: oldPlayer.played + 1,
          won: isWinner ? oldPlayer.won + 1 : oldPlayer.won,
        }

        await playerOs.put(player, playerId);
        players.set(playerId, player);
      }
      return players;
    }

    const players = holes.length === 18 ? await updatePlayers() : undefined;

    await tx.complete;
    dispatch({
      type: 'GAME_UPDATED',
      game,
      gameId: action.gameId,
      players,
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
