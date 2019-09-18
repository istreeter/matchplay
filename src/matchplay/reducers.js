// @flow
import type {Reducer} from 'redux';

import type {Player} from './model';
import type {Action} from './actions';

type PlayersPageModel = {|
    +type: 'PLAYERS',
    +players?: $ReadOnlyArray<Player>,
  |};

export type PageModel =
  | {type: 'HOME'}
  | PlayersPageModel;

export type State = {|
  +page: PageModel,
|};

export const defaultState : State = {
  page: {type: 'HOME'},
};

const handlePlayersPage = (state : PlayersPageModel, action : Action) : PlayersPageModel => {
  switch (action.type) {
    case 'PLAYERS_FETCHED':
      return {
          ...state,
          players: [...action.players].sort((a, b) => a.precedence - b.precedence),
        };

    case 'PLAYERS_ADDED':
      const players = state.players === undefined ? [action.player] : [action.player, ...state.players];
      return {
        ...state,
        players
        };
    default:
      return state;
  }
}

export const reducer : Reducer<State, Action> =
  (previousState? : State, action : Action) => {
    const state = previousState === undefined ? defaultState : previousState;

    switch (action.type) {
      case 'PLAYERS_INIT':
        return {
          ...state,
          page: { type: 'PLAYERS', players: undefined },
        }
      case 'HOME_INIT':
        return {
          ...state,
          page: { type: 'HOME' },
        }
      default:
    }

    if (state.page.type === 'PLAYERS') {
      return {
        ...state,
        page: handlePlayersPage(state.page, action),
      }
    }

    return state;

  }