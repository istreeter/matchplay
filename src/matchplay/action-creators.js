// @flow
import type {Action} from './actions';
import {randomColor} from './utils';
import {playersMiddleware} from 'matchplay/indexeddb'

export const playersInit = () : Action => ({type: 'PLAYERS_INIT'});
export const homeInit = () : Action => ({type: 'HOME_INIT'});

export const playersAdd = (name : string) : Action => ({
  type: 'PLAYERS_ADD',
  name,
  color: randomColor(),
});

export const playersMiddlewareAdd = () : Action => ({
  type: 'MIDDLEWARE_ADD',
  name: 'players',
  middleware: playersMiddleware,
});
