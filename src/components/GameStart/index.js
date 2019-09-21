// @flow
//
import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Link, Redirect} from 'react-router-dom';

import type {Player} from 'matchplay/model';
import type {State} from 'matchplay/state';
import type {Dispatch} from 'matchplay/actions';
import Base from 'components/Base';
import styles from './GameStart.module.css';

type StateProps = {|
  selected: $ReadOnlyArray<Player>,
|}

type OwnProps = {|
|}

type DispatchProps = {|
  xxx: void,
|}

type AllProps = {|
  ...StateProps,
  ...OwnProps,
  ...DispatchProps,
|}

const renderPlayer = (player: Player, index: number) =>
  <div className={styles.playerGridItem} style={{borderColor: player.color}} key={index}>
    <div>Player {index + 1}</div>
    <FontAwesomeIcon className={styles.icon} style={{color: player.color}} icon={faUser} size="4x"/>
    <div>{player.name}</div>
  </div>


const PlayerList = (props: AllProps) =>
  props.selected.length === 4 ? <Base>
      <div className={styles.playerListContainer}>
        {props.selected.map(renderPlayer)}
      </div>
      <div className={styles.startGame}>
        <Link to="/">Start game</Link>
      </div>
  </Base>
  : <Redirect to="/players"/>;

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  xxx: undefined,
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  selected: state.selectedPlayers,
});

export default connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(PlayerList);
