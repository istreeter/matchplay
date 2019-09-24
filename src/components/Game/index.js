// @flow

import React, {useEffect} from 'react';
import {withRouter, type Match, type RouterHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

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

const calculateWinners = (players, scores) => {
  return  [...players.entries()].filter(([playerId, player]) => {
      const score = scores.get(playerId) || 0;
      return [...scores.values()].every(score2 => score2 <= score);
    }).map(([playerId, player]) => player.name)
      .join(" and ");
}

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
  const players = useSelector((state: State) => state.selectedPlayers);

  if (!game) {
    return null;
  }

  const winners = game.holes.length >= 18 ? calculateWinners(players, game.totals) : undefined;

  const renderPlayer = (player, index) =>
    <div key={index} className={styles.column}>
      <div>Player {index + 1}</div>
      <div className={styles.playerCard} style={{borderColor: player.color}}>
        <FontAwesomeIcon className={styles.icon} style={{color: player.color}} icon={faUser} size="2x"/>
      </div>
      <div className={styles.playerName}>{player.name}</div>
    </div>

  const renderPlayerTotalScore = ([playerId], index) =>
    <div key={index}>{game.totals.get(playerId) || 0}</div>

  return <Base>
    <div className={styles.container}>
      <h2>Game {id} Scorecard</h2>
      {winners && <div className={styles.winner}>Winner: {winners}</div>}
      <div className={styles.row}>{Array.from(players.values(), renderPlayer)}</div>
      
      {game.holes.length > 0 && <>
        <div className={styles.holeTitle}>Total points</div>
        <div className={styles.row}>
          {Array.from(players, renderPlayerTotalScore)}
        </div>
      </>}

      {game.holes.length < 18 ? <>
        <div className={styles.holeTitle}>Hole {game.holes.length +1}</div>
        <ActiveHole
              gameId={id}
              holeIndex={game.holes.length}
              players={players} />
        </> :
        <div className={styles.help}>Game over. Find me in the club house.</div>}

      <>
        {game.holes.map((scores, index) =>
          <React.Fragment key={index}>
          <div className={styles.holeTitle}>Hole {index+1}</div>
          <Hole gameId={id}
                players={players}
                scores={scores}/>
          </React.Fragment>)}
      </>


    </div>
  </Base>
}

export default withRouter(GameComponent);
