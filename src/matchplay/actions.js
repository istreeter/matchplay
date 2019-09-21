// @flow
import type {Dispatch as ReduxDispatch, Middleware} from 'redux';

import type {Player} from './model';
import type {State} from './state';


// Results from middleware

type MiddlewareAdd = {|
  type: 'MIDDLEWARE_ADD',
  name: string,
  middleware: Middleware<State, Action, Dispatch>,
|};

type PlayersFetched = {|
  type: 'PLAYERS_FETCHED',
  players: $ReadOnlyArray<Player>,
|};

type PlayersAdded = {|
  type: 'PLAYERS_ADDED',
  player: Player,
|};

// Instructions to middleware:

type PlayersAdd = {|
  type: 'PLAYERS_ADD',
  name: string,
  color: string,
|};

type PlayersInit = {|
  type: 'PLAYERS_INIT',
|};

type GameAdd = {|
  type: 'GAME_ADD',
|};

type HomeInit = {|
  type: 'HOME_INIT',
|};

export type Action =
  | MiddlewareAdd
  | PlayersFetched
  | PlayersAdded
  | PlayersAdd
  | GameAdd
  | PlayersInit
  | HomeInit

export type Dispatch = ReduxDispatch<Action>;
