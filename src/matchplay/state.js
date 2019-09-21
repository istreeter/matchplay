// @flow

import type {Player} from './model';

export type PlayersPageModel = {|
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

