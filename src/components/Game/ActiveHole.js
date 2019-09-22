// @flow

import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import type {Player} from 'matchplay/model';
import type {Dispatch} from 'matchplay/actions';
import holesAdd from 'matchplay/action-dispatchers/holes-add';

type Props = {|
  gameId: number,
  holeIndex: number,
  players: $ReadOnlyMap<number, Player>,
|}

export default ({players, holeIndex, gameId}: Props) => {

  const [scores, setScores] = useState<$ReadOnlyMap<number,number>>(new Map());

  useEffect(() => setScores(new Map()), [players]);
  const dispatch : Dispatch = useDispatch();

  const handleClick = (playerId: number, score: number) => {
    const cloned = new Map(scores);
    cloned.set(playerId, score);
    setScores(cloned)
  };

  const renderPlayerScore = ([playerId, player], index) => {
    const score = scores.get(playerId);

    return <div key={index}>
      {player.name}: {score}
      {Array.from(Array(4).keys(), i =>
        <button key={i} onClick={() => handleClick(playerId, i+1)}>{i+1}</button>)}
    </div>;
  }

  const handleSubmit = () =>
    holesAdd(dispatch)(gameId, holeIndex, scores);

  return <div>
    Hole {holeIndex+1}
    {Array.from(players, renderPlayerScore)}
    {scores.size === players.size && <button onClick={handleSubmit}>submit</button>}
  </div>;
}
