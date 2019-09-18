// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {Player} from 'matchplay/model';
import {playersAdd} from 'matchplay/action-creators';
import type {State} from 'matchplay/reducers';
import type {Dispatch} from 'matchplay/actions';

type StateProps = {|
  players?: $ReadOnlyArray<Player>,
|}

type OwnProps = {|
|}

type DispatchProps = {|
  playersAdd: string => mixed,
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
  <div>
    <span style={{color: player.color}}>{player.name} </span>
    won {player.won}, played {player.played}
  </div>

class PlayerList extends React.PureComponent<AllProps, LocalState> {

  constructor(props: AllProps) {
    super(props);
    this.state = {
      showNewPlayer: false,
      newPlayerName: "",
    }
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
    return <>
        {this.props.players && this.props.players.map(player => <PlayerComponent player={player}/>)}
        <button onClick={this.handleAddNew}>Add player</button>
        {this.state.showNewPlayer ? this.renderNewPlayer() : null}
      </>;
  }
}

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  playersAdd: (name) => dispatch(playersAdd(name)),
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  players: state.page.type === 'PLAYERS' ? state.page.players : undefined,
});

export default connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(PlayerList);
