// @flow
import React from 'react';

import type {Player} from 'matchplay/model';
import styles from "./Game.module.css";

type Props = {|
  gameId: number,
  players: $ReadOnlyMap<number, Player>,
  scores: $ReadOnlyMap<number, number>
|}

export default ({scores, players, gameId}: Props) => {

  const renderPlayerScore = ([playerId, player], index) => {
    const score = scores.get(playerId);
    return <div key={index}>{score}</div>;
  }

  return <>
    <div className={styles.row}>
      {Array.from(players, renderPlayerScore)}
    </div>
  </>;
}

