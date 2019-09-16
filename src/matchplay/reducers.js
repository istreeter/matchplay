// @flow
import type {Reducer} from 'redux';

import type {Game, Player} from './model';
import type {Action} from './actions';

export type State = {|
  +currentGame?: Game,
  +players: {
    [string] : Player | void,
  }
|};

export const defaultState : State = {
  currentGame : undefined,
  players: {},
};

export const reducer : Reducer<State, Action> =
  (previousState? : State, action) => {
    const state = previousState === undefined ? defaultState : previousState;
    switch (action.type) {


      case 'PLAYER_ADDED':
        return {
          ...state,
          players : {
            ...state.players,
            [action.player.name]: action.player,
          }
        }

      case 'PLAYER_FETCHED_ALL':
        return {
          ...state,
          players: action.players,
        }

      // These actions are handled by middleware; they do not affect state.
      case 'GAME_ADD':
        return state;
      case 'PLAYER_ADD':
        return state;

      default:
        return state;
    }
  }
