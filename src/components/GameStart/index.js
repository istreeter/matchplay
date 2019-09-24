// @flow

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Redirect, Link, withRouter, type RouterHistory} from 'react-router-dom';

import type {Player} from 'matchplay/model';
import type {State} from 'matchplay/state';
import type {Dispatch} from 'matchplay/actions';
import gamesAdd from 'matchplay/action-dispatchers/games-add';
import Base from 'components/Base';
import styles from './GameStart.module.css';

type Props = {|
  history: RouterHistory,
|}

const renderPlayer = (player: Player, index: number) =>
  <div className={styles.playerGridItem} style={{borderColor: player.color}} key={index}>
    <div>Player {index + 1}</div>
    <FontAwesomeIcon className={styles.icon} style={{color: player.color}} icon={faUser}/>
    <div className={styles.playerName}>{player.name} </div>
  </div>


const PlayerList = (props: Props) => {

  const selected = useSelector<State, $ReadOnlyMap<number, Player>>(state => state.selectedPlayers);
  const dispatch : Dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!submitted) {
      gamesAdd(dispatch)(selected, props.history);
      // Disable button after submitted because gamesAdd handler is async:
      setSubmitted(true);
    }
  }

  return selected.size === 4 ? <Base>
      <div className={styles.ready}>Ready?</div>
      <div className={styles.playerListContainer}>
        {Array.from(selected.values(), renderPlayer)}
      </div>
      <div className={styles.startGame}>
        <Link className={styles.changePlayers}to="/players/">Change players</Link>
        <button onClick={handleSubmit}
                className={styles.button}
                autoFocus>Start game</button>
      </div>
  </Base>
  : <Redirect to="/players"/>;
}

export default withRouter(PlayerList);
