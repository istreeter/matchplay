// @flow

import React, {useState} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faUser} from '@fortawesome/free-solid-svg-icons';

import styles from './PlayerList.module.css';
import {playersAdd} from 'matchplay/action-creators';
import type {State} from 'matchplay/state';
import type {Dispatch} from 'matchplay/actions';
import {randomColor} from 'matchplay/utils';

type StateProps = {|
  xxx: void,
|}

type OwnProps = {|
|}

type DispatchProps = {|
  playersAdd: (string, string) => mixed,
|}

type AllProps = {|
  ...StateProps,
  ...OwnProps,
  ...DispatchProps,
|}

const PlayerAdd = ({playersAdd}: AllProps) => {
  const [name, setName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [color, setColor] = useState(randomColor());

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && name !== "") {
      playersAdd(name, color);
      setShowInput(false);
      setName("");
    }
  }

  if (showInput) {
    return <div className={styles.playerGridItem} style={{borderColor: color}}>
      <FontAwesomeIcon className={styles.icon} style={{color: color}} icon={faUser} size="4x"/>
      <div>New player</div>
      <input value={name}
             onChange={ev => setName(ev.target.value)}
             placeholder="Name"
             onKeyUp={handleKeyUp}
             className={styles.nameInput}
             onBlur={() => setShowInput(false)}
             autoFocus/>
    </div>
  }

  return <div className={styles.linkAdd} onClick={() => setShowInput(true)}>
      <FontAwesomeIcon className={styles.iconAdd} icon={faPlus} size="4x"/>
      <div>New player</div>
    </div>;
}


const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  playersAdd: (name, color) => dispatch(playersAdd(name, color)),
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  xxx: undefined,
});

export default connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(PlayerAdd);
