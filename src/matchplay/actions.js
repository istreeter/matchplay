// @flow
import type {Player} from './model';

// Results from middleware

type PlayersFetched = {|
  type: 'PLAYERS_FETCHED',
  players: $ReadOnlyArray<Player>,
|};

type PlayerAdded = {|
  type: 'PLAYER_ADDED',
  player: Player,
|};

// Instructions to middleware:

type PlayerAdd = {|
  type: 'PLAYER_ADD',
  name: string,
  color: string,
|};

type PlayerFetchAll = {|
  type: 'PLAYER_FETCH_ALL',
|};

type GameAdd = {|
  type: 'GAME_ADD',
|};

export type Action =
  | PlayersFetched
  | PlayerAdded
  | PlayerAdd
  | PlayerFetchAll
  | GameAdd
