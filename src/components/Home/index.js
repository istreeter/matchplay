// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {State} from 'matchplay/reducers';
import type {Dispatch} from 'matchplay/actions';
import {playersInit} from 'matchplay/action-creators';
import logo from 'logo.svg';
import './Home.css';

type StateProps = {|
  xxx: void,
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

const Component = (props: AllProps) =>
  <div className="container">
    <div className="bar1">
      The Matt Evans super match play app
    </div>
    <div className="bar2">
      <button onClick={e => props.playersInit()}>Get started</button>
    </div>
    <img src={logo} alt="logo" />
  </div>

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  playersInit: () => dispatch(playersInit()),
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  xxx: undefined,
});

export default connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(Component);
