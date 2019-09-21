// @flow
import type {Dispatch} from 'redux';
import { createStore, applyMiddleware } from 'redux';

import {reducer, defaultState} from './reducers';
import type {State} from './state';
import type {Action} from './actions';
import {middleware} from './flexible-middleware';

export default createStore<State, Action, Dispatch<Action>>(reducer, defaultState, applyMiddleware(middleware));

