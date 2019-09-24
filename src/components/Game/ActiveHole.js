// @flow

import React, {useState, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';

import type {Player} from 'matchplay/model';
import type {Dispatch} from 'matchplay/actions';
import holesAdd from 'matchplay/action-dispatchers/holes-add';
import {ranksToPoints} from 'matchplay/utils';
import styles from "./Game.module.css";

type Props = {|
  gameId: number,
  holeIndex: number,
  players: $ReadOnlyMap<number, Player>,
  initRanks?: $ReadOnlyMap<number, number>,
|}

const labels = ["st", "nd", "rd", "th"];

export default ({players, holeIndex, gameId, initRanks}: Props) => {

  const [ranks, setRanks] = useState<$ReadOnlyMap<number,number>>(initRanks || new Map());
  const scores = useMemo(() => ranksToPoints(ranks), [ranks]);

  useEffect(() => setRanks(initRanks || new Map()), [players, holeIndex, gameId, initRanks]);
  const dispatch : Dispatch = useDispatch();

  const handleClick = (playerId: number, rank: number) => {
    const cloned = new Map(ranks);
    cloned.set(playerId, rank);
    setRanks(cloned)
  };

  const renderPlayerScore = ([playerId, player], index) => {
    const rank = ranks.get(playerId);
    const score = scores.get(playerId);

    return <div key={index} className={styles.scoreSelect}>
      {Array.from(Array(4).keys(), i =>
        <button key={i}
                autoFocus={index === 0 && i === 0}
                onClick={() => handleClick(playerId, i+1)}
                className={rank === i+1 ? styles.selected : undefined}>{i+1}<sup>{labels[i]}</sup></button>)}
      {scores.size === 4 && <div>{score} pts</div>}
    </div>;
  }

  const handleSubmit = () =>
    holesAdd(dispatch)(gameId, holeIndex, ranks);

  const renderSubmit = () => {
    if (ranks.size !== players.size) {
      return <div className={styles.help}>Select rank of each player</div>
    }
    const msg = holeIndex === 17 ? "Submit scorecard" : "Next hole";
    return <div className={styles.help}>
      <button onClick={handleSubmit} autoFocus className={styles.nextButton}>{msg}</button>
    </div>
  }

  return<>
    <div className={styles.row}>
      {Array.from(players, renderPlayerScore)}
    </div>
    {renderSubmit()}
  </>;
}
