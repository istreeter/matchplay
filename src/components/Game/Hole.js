// @flow
import React from 'react';

import type {Player} from 'matchplay/model';

type Props = {|
  holeIndex: number,
  players: $ReadOnlyMap<number, Player>,
  scores: $ReadOnlyMap<number, number>
|}

export default ({scores, players, holeIndex}: Props) => {

  const renderPlayerScore = ([playerId, score], index) => {
    const player = players.get(playerId);
    if (player === undefined) {
      return null;
    }
    return <div key={index}>{player.name}: {score} points</div>;
  }

  return <div>
    Hole {holeIndex+1}
    {Array.from(scores, renderPlayerScore)}
  </div>;
}
