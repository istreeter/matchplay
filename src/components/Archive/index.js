// @flow

import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import archiveInit from 'matchplay/action-dispatchers/archive-init';
import playersInit from 'matchplay/action-dispatchers/players-init';
import type {State} from 'matchplay/state';
import type {Dispatch} from 'matchplay/actions';
import type {Player, Game} from 'matchplay/model';
import Base from 'components/Base';
import styles from './Archive.module.css';

type PlayerProps = {|
  players?: $ReadOnlyMap<number, Player>,
  gameId: number,
  game: Game,
|};

const GameComponent = ({game, gameId, players}: PlayerProps) => {

  const playersWithScores = Array.from(game.totals, ([playerId, score]) => {
      const player = players ? players.get(playerId) : undefined;
      return [playerId, player, score];
  }).sort((a, b) => b[2] - a[2]);

  return <Link to={`/game/${gameId}/`} className={styles.archiveGridItem}>
    <div className={styles.gameTitle}>Game {gameId}</div>
    {game.holes.length < 18 && <div className={styles.inProgress}>in progress...</div>}
    <div className={styles.players}>{playersWithScores.map(([playerId, player, score]) =>
        <div key={playerId}>{player ? player.name : "unknown"}: {score}</div>
      )}
    </div>
  </Link>
}

export default () => {

  const dispatch : Dispatch = useDispatch();
  const archive = useSelector((state : State) => state.archive);
  const players = useSelector((state : State) => state.players);

  useEffect(() => playersInit(dispatch)(), [dispatch]);
  useEffect(() => archiveInit(dispatch)(), [dispatch]);

  return <Base>
    <div className={styles.archiveListContainer}>
      {archive && Array.from(archive, ([gameId, game]) =>
        <GameComponent key={gameId}
                       gameId={gameId}
                       game={game}
                       players={players}/>)}
    </div>
  </Base>;
}
