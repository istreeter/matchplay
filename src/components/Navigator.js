// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {State} from 'matchplay/reducers';
import type {Dispatch} from 'matchplay/actions';
import {playersInit, homeInit} from 'matchplay/action-creators';

type StateProps = {|
  xxx: void,
|}

type OwnProps = {|
|}

type DispatchProps = {|
  playersInit: () => mixed,
  homeInit: () => mixed,
|}

type AllProps = {|
  ...StateProps,
  ...OwnProps,
  ...DispatchProps,
|}

const Navigator = (props: AllProps) =>
  <>
    <button onClick={e => props.homeInit()}>Home</button>
    <button onClick={e => props.playersInit()}>Players</button>
  </>

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  playersInit: () => dispatch(playersInit()),
  homeInit: () => dispatch(homeInit()),
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  xxx: undefined,
});

export default connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(Navigator);
