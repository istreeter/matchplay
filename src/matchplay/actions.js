// @flow
import type {Dispatch as ReduxDispatch, Middleware} from 'redux';
import type {RouterHistory} from 'react-router-dom';

import type {Player, Game} from './model';
import type {State} from './state';

// Targetted at reducer:

type PlayersFetched = {|
  type: 'PLAYERS_FETCHED',
  players: $ReadOnlyMap<number, Player>,
|};

type PlayersAdded = {|
  type: 'PLAYERS_ADDED',
  player: Player,
  playerId: number,
|};

type PlayersSelected = {|
  type: 'PLAYERS_SELECTED',
  players: $ReadOnlyMap<number, Player>,
|};

type GameFetched = {|
  type: 'GAME_FETCHED',
  game: Game,
  gameId: number,
|};

// (Typed like this to keep the reducer very simple)
type GameUpdated = {|
  type: 'GAME_UPDATED',
  game: Game,
  gameId: number,
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
  players: $ReadOnlyMap<number, Player>,
  history: RouterHistory,
|};

type GameInit = {|
  type: 'GAME_INIT',
  id: number,
  history: RouterHistory,
|};

type HolesAdd = {|
  type: 'HOLES_ADD',
  gameId: number,
  holeIndex: number,
  scores: $ReadOnlyMap<number, number>, // map from playerId to score
|};

export type Action =
  | MiddlewareAdd
  | PlayersFetched
  | PlayersAdded
  | PlayersSelected
  | PlayersAdd
  | GameAdd
  | GameInit
  | PlayersInit
  | GameFetched
  | HolesAdd
  | GameUpdated

export type Dispatch = ReduxDispatch<Action>;
