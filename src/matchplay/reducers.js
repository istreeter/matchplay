// @flow
import type {Reducer} from 'redux';

import type {Action} from './actions';
import type {State} from './state';


export const defaultState : State = {
  players: undefined,
  selectedPlayers: new Map(),
  game: undefined,
};

export const reducer : Reducer<State, Action> =
  (previousState? : State, action : Action) => {
    const state = previousState === undefined ? defaultState : previousState;
    console.log(action);

    switch (action.type) {
      case 'PLAYERS_FETCHED':
        return {
            ...state,
            players: action.players,
          };

      case 'PLAYERS_ADDED':
        const players = state.players === undefined
                    ? [[action.playerId, action.player]]
                    : [[action.playerId, action.player], ...state.players];
        const selectedPlayers = state.selectedPlayers.size < 4
            ? new Map([...state.selectedPlayers, [action.playerId, action.player]])
            : state.selectedPlayers;
        return {
          ...state,
          players: new Map(players),
          selectedPlayers,
          };

      case 'PLAYERS_SELECTED':
        return {
          ...state,
          selectedPlayers: action.players,
          };

      case 'GAME_FETCHED':
        return {
          ...state,
          game: action.game,
          gameId: action.gameId,
          selectedPlayers: action.players,
        }

      case 'GAME_UPDATED':
        return state.game && state.gameId === action.gameId
           ? { ...state,
               game: action.game,
               selectedPlayers: action.players ? action.players : state.selectedPlayers}
           : state;

      default:
        return state;
    }

  }
