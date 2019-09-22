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
  const selected = useSelector<State, $ReadOnlyArray<Player>>(state => state.selectedPlayers);
  const players = useSelector<State, $ReadOnlyArray<Player> | void>(state => state.players);

  useEffect(() => playersInit(dispatch)());

  const handlePlayerSelect = (p: Player) => {
    const newSelected =
      selected.find(p2 => p2.id === p.id) === undefined
      ? [p, ...selected]
      : selected.filter(p2 => p.id !== p2.id);
    playersSelected(dispatch)(newSelected);
    if (newSelected.length === 4) {
      history.push("/game/start");
    }
  };

  const renderHelpText = () => {
    const needed = 4 - selected.length;
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
      {players && players.map(player =>
        <PlayerComponent key={player.id}
                         player={player}
                         onClick={() => handlePlayerSelect(player)}
                         selected={selected.find(p => p.id === player.id) !== undefined}/>)}
    </div>;
  </Base>;
}

export default withRouter(PlayerList);
