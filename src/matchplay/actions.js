// @flow
import type {Player} from './model';

// Results from middleware

type PlayerMergeIn = {|
  type: 'PLAYER_MERGE_IN',
  players: {
    [string] : Player | void,
  }
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
  | PlayerMergeIn
  | PlayerAdd
  | PlayerFetchAll
  | GameAdd
