// @flow

import React, {useEffect} from 'react';
import {withRouter, type Match, type RouterHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import type {Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import gameInit from 'matchplay/action-dispatchers/game-init';

type Props = {|
  match: Match,
  history: RouterHistory
|};

const GameComponent = ({match, history}: Props) => {
  const id = parseInt(match.params['id']);

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (isNaN(id)) {
      history.replace("/");
    } else {
      gameInit(dispatch)(id, history);
    }
  }, [id, dispatch, history]);

  const game = useSelector((state: State) => state.game);

  if (!game) {
    return null;
  }

  return <div>{game.date.toString()}</div>
}

export default withRouter(GameComponent);
