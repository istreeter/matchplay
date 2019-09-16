// @flow
import type {Reducer} from 'redux';

import type {Game, Player} from './model';
import type {Action} from './actions';

export type State = {|
  +currentGame?: Game,
  +players: {
    [string] : Player | void,
  },
  +isFetchingPlayers: boolean,
  +hasFetchedPlayers: boolean,
|};

export const defaultState : State = {
  currentGame: undefined,
  players: {},
  isFetchingPlayers: false,
  hasFetchedPlayers: false,
};

export const reducer : Reducer<State, Action> =
  (previousState? : State, action : Action) => {
    const state = previousState === undefined ? defaultState : previousState;
    switch (action.type) {


      case 'PLAYERS_FETCHED':
        return {
          ...state,
          players : action.players.reduce((players, player) => {
            players[player.id.toString()] = player;
            return players;
          }, {}),
          isFetchingPlayers: false,
          hasFetchedPlayers: true,
        }

      case 'PLAYER_ADDED':
        return {
          ...state,
          players : {
            ...state.players,
            [action.player.id.toString()]: action.player,
          },
        }

      case 'PLAYER_FETCH_ALL':
        return {
          ...state,
          isFetchingPlayers: true,
          hasFetchedPlayers: false,
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
