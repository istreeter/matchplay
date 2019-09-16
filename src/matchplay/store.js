// @flow
import type {Reducer, Dispatch} from 'redux';
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import localforage from 'localforage';

type OnlyAction =
  {| +type: 'ONLY_ACTION' |}

const onlyAction = () : OnlyAction => ({type: 'ONLY_ACTION'});

type State =
  {| something: number |};

const reducer : Reducer<State, OnlyAction> =
  (previousState, action) =>
    previousState === undefined ? {something : 1} : previousState;

const persistConfig = {
    key : 'root',
    storage : localforage,
    reconciler : hardSet,
  }

const persistedReducer : Reducer<State, OnlyAction> = persistReducer(persistConfig, reducer);

export const store = createStore<State, OnlyAction, Dispatch<OnlyAction>>(persistedReducer);
export const persistor = persistStore(store);
