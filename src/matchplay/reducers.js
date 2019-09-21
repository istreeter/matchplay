// @flow
import type {Reducer} from 'redux';

import type {Action} from './actions';
import type {State} from './state';


export const defaultState : State = {
  players: undefined,
  selectedPlayers: [],
};

export const reducer : Reducer<State, Action> =
  (previousState? : State, action : Action) => {
    const state = previousState === undefined ? defaultState : previousState;

    switch (action.type) {
      case 'PLAYERS_FETCHED':
        return {
            ...state,
            players: [...action.players].sort((a, b) => b.precedence - a.precedence),
          };

      case 'PLAYERS_ADDED':
        const players = state.players === undefined ? [action.player] : [action.player, ...state.players];
        return {
          ...state,
          players
          };

      case 'PLAYERS_SELECTED':
        return {
          ...state,
          selectedPlayers: action.players,
          };

      default:
        return state;
    }

  }
