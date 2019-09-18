// @flow
import type {Player} from './model';
import type {Dispatch as ReduxDispatch} from 'redux';

// Results from middleware

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
  | PlayersFetched
  | PlayersAdded
  | PlayersAdd
  | GameAdd
  | PlayersInit
  | HomeInit

export type Dispatch = ReduxDispatch<Action>;
