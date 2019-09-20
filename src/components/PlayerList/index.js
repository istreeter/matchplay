// @flow

import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import type {Player} from 'matchplay/model';
import {playersAdd, playersInit} from 'matchplay/action-creators';
import type {State} from 'matchplay/reducers';
import type {Dispatch} from 'matchplay/actions';
import Base from 'components/Base';
import styles from './PlayerList.module.css';

type StateProps = {|
  players?: $ReadOnlyArray<Player>,
|}

type OwnProps = {|
|}

type DispatchProps = {|
  playersAdd: string => mixed,
  playersInit: () => mixed,
|}

type AllProps = {|
  ...StateProps,
  ...OwnProps,
  ...DispatchProps,
|}

type LocalState = {|
  showNewPlayer: boolean,
  newPlayerName: string,
|}

const PlayerComponent = ({player}) =>
  <div className={styles.player_grid_item}>
    <div>
      <FontAwesomeIcon style={{color: player.color}} icon={faUser} size="4x"/>
    </div>
    <div>{player.name} </div>
    <div className={styles.player_stats}>won {player.won}, played {player.played}</div>
  </div>

class PlayerList extends React.PureComponent<AllProps, LocalState> {

  constructor(props: AllProps) {
    super(props);
    this.state = {
      showNewPlayer: false,
      newPlayerName: "",
    }
  }

  componentDidMount() {
    this.props.playersInit();
  }

  handleAddNew = () =>
    this.setState({showNewPlayer: true})

  handleDismiss = () =>
    this.setState({showNewPlayer: false})

  handleSubmit = () => {
    this.props.playersAdd(this.state.newPlayerName);
    this.handleDismiss();
  }

  handleNameChange = (event : SyntheticInputEvent<>) =>
    this.setState({newPlayerName: event.target.value})

  renderNewPlayer = () =>
    <>
      <input value={this.state.newPlayerName} onChange={this.handleNameChange}/>
      <button onClick={this.handleSubmit}>submit</button>
      <button onClick={this.handleDismiss}>cancel</button>
    </>

  render() {
    return <Base>
      <div className={styles.container}>
        <div className={styles.player_list_container}>
          {this.props.players && this.props.players.map(player =>
            <PlayerComponent player={player} key={player.id}/>)}
        </div>
        <div className={styles.buttons}>
          <button onClick={this.handleAddNew}>Add player</button>
          {this.state.showNewPlayer ? this.renderNewPlayer() : null}
        </div>
      </div>
    </Base>;
  }
}

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  playersAdd: (name) => dispatch(playersAdd(name)),
  playersInit: () => dispatch(playersInit()),
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  players: state.page.type === 'PLAYERS' ? state.page.players : undefined,
});

export default connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(PlayerList);
