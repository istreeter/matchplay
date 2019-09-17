// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {Player} from 'matchplay/model';
import {playersInit} from 'matchplay/action-creators';
import type {State} from 'matchplay/reducers';
import type {Dispatch} from 'matchplay/actions';

type StateProps = {|
  players?: $ReadOnlyArray<Player>,
|}

type OwnProps = {|
|}

type DispatchProps = {|
  playersInit: () => mixed,
|}

type AllProps = {|
  ...StateProps,
  ...OwnProps,
  ...DispatchProps,
|}

class PlayerList extends React.PureComponent<AllProps> {

  compnentDidMount() {
    this.props.playersInit();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  playersInit: () => dispatch(playersInit()),
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  players: state.page.type === 'PLAYERS' ? state.page.players : undefined,
});

connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(PlayerList);
