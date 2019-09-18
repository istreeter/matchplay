// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {PageModel, State} from 'matchplay/reducers';
import PlayerList from './PlayerList';
import Home from './Home';
import type {Dispatch} from 'matchplay/actions';

type StateProps = {|
  page: PageModel,
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

const Router = (props: AllProps) => {
  switch (props.page.type) {
    case 'PLAYERS':
      return <PlayerList/>;
    default:
      return <Home/>;
  }
}

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  xxx: undefined,
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  page: state.page,
});

export default connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(Router);
