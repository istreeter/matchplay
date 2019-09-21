// @flow

import type {Middleware} from 'redux';
import type {State} from './state';
import type {Action, Dispatch} from './actions';

const middlewares: {[string]: Middleware<State, Action, Dispatch>} = {};

export const middleware : Middleware<State, Action, Dispatch> =
  store => next => action => {
    if (action.type === 'MIDDLEWARE_ADD') {
      middlewares[action.name] = action.middleware;
      return next(action);
    }
    else {
      const reducedDispatch =
        Object.keys(middlewares).reduce((dispatch, middlewareName) => {
          const middleware = middlewares[middlewareName];
          return action2 => middleware(store)(dispatch)(action2);
        }, next);
      return reducedDispatch(action);
    }
  }
