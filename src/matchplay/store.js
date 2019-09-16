// @flow
import type {Dispatch} from 'redux';
import { createStore, applyMiddleware } from 'redux';

import {reducer, defaultState, type State} from './reducers';
import type {Action} from './actions';
import {dbMiddleware} from './indexeddb';

export default createStore<State, Action, Dispatch<Action>>(reducer, defaultState, applyMiddleware(dbMiddleware));

