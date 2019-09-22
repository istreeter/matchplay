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
import styles from './Game.module.css';

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

  const renderPlayer = (player) =>
    <div className={styles.playerCard}>{player.name}</div>

  return <Base>
    <div className={styles.container}>
      <div>Game {id} Scorecard</div>
      {winner && <div>Winner: {winner.name}</div>}
      <div className={styles.row}>{Array.from(game.players.values(), renderPlayer)}</div>

      <>
        {game.holes.map((scores, index) =>
          <React.Fragment key={index}>
          <div>Hole {index+1}</div>
          <Hole gameId={id}
                players={game.players}
                scores={scores}/>
          </React.Fragment>)}
      </>


      <div>Hole {game.holes.length +1}</div>
      {game.holes.length < 18 && <ActiveHole
              gameId={id}
              holeIndex={game.holes.length}
              players={game.players} />}
    </div>
  </Base>
}

export default withRouter(GameComponent);
