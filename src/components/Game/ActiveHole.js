// @flow

import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import type {Player} from 'matchplay/model';
import type {Dispatch} from 'matchplay/actions';
import holesAdd from 'matchplay/action-dispatchers/holes-add';
import styles from "./Game.module.css";

type Props = {|
  gameId: number,
  holeIndex: number,
  players: $ReadOnlyMap<number, Player>,
  initScores?: $ReadOnlyMap<number, number>,
|}

export default ({players, holeIndex, gameId, initScores}: Props) => {

  const [scores, setScores] = useState<$ReadOnlyMap<number,number>>(initScores || new Map());

  useEffect(() => setScores(initScores || new Map()), [players, holeIndex, gameId, initScores]);
  const dispatch : Dispatch = useDispatch();

  const handleClick = (playerId: number, score: number) => {
    const cloned = new Map(scores);
    cloned.set(playerId, score);
    setScores(cloned)
  };

  const renderPlayerScore = ([playerId, player], index) => {
    const score = scores.get(playerId);

    return <div key={index} className={styles.scoreSelect}>
      {Array.from(Array(4).keys(), i =>
        <button key={i}
                onClick={() => handleClick(playerId, i+1)}
                className={score === i+1 ? styles.selected : undefined}>{i+1}</button>)}
    </div>;
  }

  const handleSubmit = () =>
    holesAdd(dispatch)(gameId, holeIndex, scores);

  const renderSubmit = () => {
    if (scores.size !== players.size) {
      return <div className={styles.help}>Select score for each player</div>
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
