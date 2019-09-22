// @flow

import React, {useEffect} from 'react';
import {withRouter, type Match, type RouterHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import type {Dispatch} from 'matchplay/actions';
import type {State} from 'matchplay/state';
import gameInit from 'matchplay/action-dispatchers/game-init';
import Base from 'components/Base';
import Hole from './Hole';
import ActiveHole from './ActiveHole';

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

  const winner = game.winner && game.players.get(game.winner);

  return <Base>
      <div>Game {id}</div>
      {winner && <div>Winner: {winner.name}</div>}
      <div>
        {game.holes.map((scores, index) =>
          <Hole key={index}
                holeIndex={index}
                players={game.players}
                scores={scores}/>)}
        {game.holes.length < 18 && <ActiveHole
                gameId={id}
                holeIndex={game.holes.length}
                players={game.players} />}
      </div>
    </Base>
}

export default withRouter(GameComponent);
