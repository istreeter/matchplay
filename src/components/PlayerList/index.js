// @flow

import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {withRouter, type RouterHistory} from 'react-router';

import type {Player} from 'matchplay/model';
import playersSelected from 'matchplay/action-dispatchers/players-selected';
import playersInit from 'matchplay/action-dispatchers/players-init';
import type {State} from 'matchplay/state';
import type {Dispatch} from 'matchplay/actions';
import Base from 'components/Base';
import styles from './PlayerList.module.css';
import PlayerAdd from './PlayerAdd';

type Props = {|
  history: RouterHistory,
|}

type PlayerProps = {|
  selected: boolean,
  player: Player,
  onClick: () => mixed,
|};

const PlayerComponent = ({selected, player, onClick}: PlayerProps) => {

    const selectedClass = selected ?  styles.selected : styles.unselected;
    const style = selected ? {borderColor: player.color} : undefined;
    const iconStyle = selected ? {color: player.color} : undefined;

    return <div className={`${styles.playerGridItem} ${selectedClass}`}
                style={style}
                onClick={onClick}>
      <FontAwesomeIcon className={styles.icon} style={iconStyle} icon={faUser} size="4x"/>
      <div>{player.name} </div>
      <div>won {player.won}, played {player.played}</div>
    </div>
}

const PlayerList = ({history}: Props) => {

  const dispatch : Dispatch = useDispatch();
  const selected = useSelector<State, $ReadOnlyMap<number, Player>>(state => state.selectedPlayers);
  const players = useSelector<State, $ReadOnlyMap<number, Player> | void>(state => state.players);

  useEffect(() => playersInit(dispatch)(), [dispatch]);

  const handlePlayerSelect = (id: number, player: Player) => {
    const newSelected = selected.has(id)
          ? new Map([...selected.entries()].filter(([id2, p]) => id2 !== id))
          : new Map([...selected.entries(), [id, player]]);
    playersSelected(dispatch)(newSelected);
    if (newSelected.size === 4) {
      history.push("/game/start");
    }
  };

  const renderHelpText = () => {
    const needed = 4 - selected.size;
    const msg = needed === 4 ? '4'
              : needed > 0 ? `${needed} more`
              : '4';
    return <div className={styles.helpText}>
      Select {msg} player{needed === 1 ? '' : 's'} to start a game
      </div>

  }

  return <Base>
    {renderHelpText()}
    <div className={styles.playerListContainer}>
      <PlayerAdd/>
      {players && Array.from(players, ([playerId, player]) =>
        <PlayerComponent key={playerId}
                         player={player}
                         onClick={() => handlePlayerSelect(playerId, player)}
                         selected={selected.has(playerId)}/>)}
    </div>;
  </Base>;
}

export default withRouter(PlayerList);
