// @flow

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faUser} from '@fortawesome/free-solid-svg-icons';

import styles from './PlayerList.module.css';
import playersAdd from 'matchplay/action-dispatchers/players-add';
import type {Dispatch} from 'matchplay/actions';
import {randomColor} from 'matchplay/utils';

export default () => {
  const [name, setName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [color, setColor] = useState(randomColor());
  const dispatch : Dispatch = useDispatch();

  // reset if user is clicking on other icons
  const selected = useSelector<State, $ReadOnlyMap<number, Player>>(state => state.selectedPlayers);
  useEffect(() => setShowInput(false), [selected]);

  const handleSubmit = () => {
    if (name !== "") {
      playersAdd(dispatch)(name, color);
      setShowInput(false);
      setName("");
      setColor(randomColor());
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  if (showInput) {
    return <div className={styles.playerGridItem} style={{borderColor: color}}>
      <FontAwesomeIcon className={styles.icon} style={{color: color}} icon={faUser} size="4x"/>
      <div>New player</div>
      <div className={styles.inputGroup}>
        <input value={name}
               onChange={ev => setName(ev.target.value)}
               placeholder="Name"
               onKeyUp={handleKeyUp}
               className={styles.nameInput}
               autoFocus/>
        <button onClick={handleSubmit}>OK</button>
      </div>
    </div>
  }

  return <div className={styles.linkAdd} onClick={() => setShowInput(true)}>
      <FontAwesomeIcon className={styles.iconAdd} icon={faPlus} size="4x"/>
      <div>New player</div>
    </div>;
}
