// @flow

import React from 'react';
import {connect} from 'react-redux';
import { withRouter , type ContextRouter} from 'react-router';

import {playersAdd} from 'matchplay/action-creators';
import type {State} from 'matchplay/reducers';
import type {Dispatch} from 'matchplay/actions';
import Base from 'components/Base';

type StateProps = {|
  xxx: void,
|}

type DispatchProps = {|
  playersAdd: string => mixed,
|}

type AllProps = {|
  ...StateProps,
  ...ContextRouter,
  ...DispatchProps,
|}

type LocalState = {|
  newPlayerName: string,
|}

class PlayerAdd extends React.PureComponent<AllProps, LocalState> {

  constructor(props: AllProps) {
    super(props);
    this.state = {
      newPlayerName: "",
    }
  }

  handleSubmit = () => {
    this.props.playersAdd(this.state.newPlayerName);
    this.props.history.push("/players/");
  }

  handleNameChange = (event : SyntheticInputEvent<>) =>
    this.setState({newPlayerName: event.target.value})

  render() {
    return <Base>
      <input value={this.state.newPlayerName} onChange={this.handleNameChange}/>
      <button onClick={this.handleSubmit}>submit</button>
    </Base>
  }

}

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  playersAdd: (name) => dispatch(playersAdd(name)),
})

const mapStateToProps = (state : State, ownProps : ContextRouter) : StateProps => ({
  xxx: undefined,
});

const connected = connect<AllProps, ContextRouter, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(PlayerAdd);

export default withRouter(connected);
