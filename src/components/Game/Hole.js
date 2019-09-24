// @flow
import React, {useMemo} from 'react';

import type {Player} from 'matchplay/model';
import styles from "./Game.module.css";
import {ranksToPoints} from 'matchplay/utils';

type Props = {|
  gameId: number,
  players: $ReadOnlyMap<number, Player>,
  ranks: $ReadOnlyMap<number, number>
|}

export default ({ranks, players, gameId}: Props) => {

  const scores = useMemo(() => ranksToPoints(ranks), [ranks]);

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

