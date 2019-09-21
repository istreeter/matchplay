// @flow
import type {Action} from './actions';
import {type Player} from './model';
import {playersMiddleware} from 'matchplay/indexeddb'

export const playersInit = () : Action => ({type: 'PLAYERS_INIT'});

export const playersAdd = (name : string, color: string) : Action => ({
  type: 'PLAYERS_ADD',
  name,
  color,
});

export const playersSelected = (players : $ReadOnlyArray<Player>) : Action => ({
  type: 'PLAYERS_SELECTED',
  players,
});

export const playersMiddlewareAdd = () : Action => ({
  type: 'MIDDLEWARE_ADD',
  name: 'players',
  middleware: playersMiddleware,
});
