// @flow
import type {Dispatch} from 'redux';
import { createStore, applyMiddleware } from 'redux';

import {reducer, defaultState, type State} from './reducers';
import type {Action} from './actions';
import {dbMiddleware} from './indexeddb';

const store = createStore<State, Action, Dispatch<Action>>(reducer, defaultState, applyMiddleware(dbMiddleware));

store.dispatch({type: 'INIT'});

export default store;
