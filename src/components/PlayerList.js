// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {Player} from 'matchplay/model';
import {playersAdd, playersInit} from 'matchplay/action-creators';
import type {State} from 'matchplay/reducers';
import type {Dispatch} from 'matchplay/actions';
import Base from 'components/Base';

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
        {this.props.players && this.props.players.map(player =>
          <PlayerComponent player={player} key={player.id}/>)}
        <button onClick={this.handleAddNew}>Add player</button>
        {this.state.showNewPlayer ? this.renderNewPlayer() : null}
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
