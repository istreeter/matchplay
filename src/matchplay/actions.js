// @flow
import type {Dispatch as ReduxDispatch, Middleware} from 'redux';
import type {RouterHistory} from 'react-router-dom';

import type {Player} from './model';
import type {State} from './state';

// Targetted at reducer:

type PlayersFetched = {|
  type: 'PLAYERS_FETCHED',
  players: $ReadOnlyArray<Player>,
|};

type PlayersAdded = {|
  type: 'PLAYERS_ADDED',
  player: Player,
|};

type PlayersSelected = {|
  type: 'PLAYERS_SELECTED',
  players: $ReadOnlyArray<Player>,
|};

// Instructions to middleware:

type MiddlewareAdd = {|
  type: 'MIDDLEWARE_ADD',
  name: string,
  middleware: Middleware<State, Action, Dispatch>,
|};

type PlayersAdd = {|
  type: 'PLAYERS_ADD',
  name: string,
  color: string,
|};

type PlayersInit = {|
  type: 'PLAYERS_INIT',
|};

type GameAdd = {|
  type: 'GAMES_ADD',
  players: $ReadOnlyArray<Player>,
  history: RouterHistory,
|};

export type Action =
  | MiddlewareAdd
  | PlayersFetched
  | PlayersAdded
  | PlayersSelected
  | PlayersAdd
  | GameAdd
  | PlayersInit

export type Dispatch = ReduxDispatch<Action>;
