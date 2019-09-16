// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {Player} from 'matchplay/model';
import {playerFetchAll} from 'matchplay/action-creators';
import type {State} from 'matchplay/reducers';
import type {Dispatch} from 'matchplay/actions';

type StateProps = {|
  players: $ReadOnlyArray<Player>,
|}

type OwnProps = {|
|}

type DispatchProps = {|
  fetchAll: () => mixed,
|}

type AllProps = {|
  ...StateProps,
  ...OwnProps,
  ...DispatchProps,
|}

class PlayerList extends React.PureComponent<AllProps> {

  compnentDidMount() {
    this.props.fetchAll();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  fetchAll: () => dispatch(playerFetchAll()),
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  players: Object.keys(state.players).reduce((players, key) => {
    const p = state.players[key];
    if (p !== undefined) {
      players.push(p);
    }
    return players;
  }, []),
});

connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(PlayerList);
