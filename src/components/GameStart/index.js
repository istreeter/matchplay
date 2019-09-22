// @flow

import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Redirect} from 'react-router-dom';
import {withRouter, type RouterHistory} from 'react-router';

import type {Player} from 'matchplay/model';
import type {State} from 'matchplay/state';
import type {Dispatch} from 'matchplay/actions';
import gamesAdd from 'matchplay/action-dispatchers/games-add';
import Base from 'components/Base';
import styles from './GameStart.module.css';

type StateProps = {|
  selected: $ReadOnlyArray<Player>,
|}

type OwnProps = {|
  history: RouterHistory,
|}

type DispatchProps = {|
  gamesAdd: ($ReadOnlyArray<Player>, RouterHistory) => mixed,
|}

type AllProps = {|
  ...StateProps,
  ...OwnProps,
  ...DispatchProps,
|}

type LocalState = {|
  submitted: boolean,
|};

const renderPlayer = (player: Player, index: number) =>
  <div className={styles.playerGridItem} style={{borderColor: player.color}} key={index}>
    <div>Player {index + 1}</div>
    <FontAwesomeIcon className={styles.icon} style={{color: player.color}} icon={faUser} size="4x"/>
    <div>{player.name}</div>
  </div>


class PlayerList extends React.PureComponent<AllProps, LocalState> {

  constructor(props: AllProps) {
    super(props);
    this.state = {submitted: false};
  }

  handleSubmit = () => {
    if (!this.state.submitted) {
      this.props.gamesAdd(this.props.selected, this.props.history);
      this.setState({submitted: true});
    }
  }

  render() {
    return this.props.selected.length === 4 ? <Base>
        <div className={styles.playerListContainer}>
          {this.props.selected.map(renderPlayer)}
        </div>
        <div className={styles.startGame}>
          <button onClick={this.handleSubmit}>Start game</button>
        </div>
    </Base>
    : <Redirect to="/players"/>;
  }
}

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  gamesAdd: gamesAdd(dispatch),
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  selected: state.selectedPlayers,
});

const connected = connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(PlayerList);

export default withRouter(connected);
