// @flow
import type {Dispatch} from 'matchplay/actions';
import {type Player} from 'matchplay/model';

export default (dispatch: Dispatch) => (players : $ReadOnlyArray<Player>) =>
  dispatch({
    type: 'PLAYERS_SELECTED',
    players,
  });

