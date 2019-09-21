// @flow

import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import {withRouter, type ContextRouter} from 'react-router';

import type {Player} from 'matchplay/model';
import {playersAdd, playersInit} from 'matchplay/action-creators';
import type {State} from 'matchplay/reducers';
import type {Dispatch} from 'matchplay/actions';
import Base from 'components/Base';
import styles from './PlayerList.module.css';

type StateProps = {|
  players?: $ReadOnlyArray<Player>,
|}

type DispatchProps = {|
  playersAdd: string => mixed,
  playersInit: () => mixed,
|}

type AllProps = {|
  ...StateProps,
  ...ContextRouter,
  ...DispatchProps,
|}


type LocalState = {|
  selected: $ReadOnlyArray<Player>,
|};

type PlayerProps = {|
  selected: boolean,
  player: Player,
  onClick: () => mixed,
|};

const PlayerComponent = ({selected, player, onClick}: PlayerProps) => {

    const selectedClass = selected ?  styles.selected : styles.unselected;
    const style = selected ? {borderColor: player.color} : undefined;
    const iconStyle = selected ? {color: player.color} : undefined;

    return <div className={`${styles.player_grid_item} ${selectedClass}`}
                style={style}
                onClick={onClick}>
      <FontAwesomeIcon className={styles.icon} style={iconStyle} icon={faUser} size="4x"/>
      <div>{player.name} </div>
      <div className={styles.player_stats}>won {player.won}, played {player.played}</div>
    </div>
}

class PlayerList extends React.PureComponent<AllProps, LocalState> {

  constructor(props: AllProps) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  componentDidMount() {
    this.props.playersInit();
  }

  handlePlayerSelect = (p: Player) => {
    const {selected} = this.state;
    const newSelected =
      selected.find(p2 => p2.id === p.id) === undefined
      ? [p, ...selected]
      : selected.filter(p2 => p.id !== p2.id);
    this.setState({selected: newSelected});
    if (newSelected.length === 4) {
      this.props.history.push("/players/start");
    }
  };

  renderSelector = () => <div className={styles.player_list_container}>
    <Link className={styles.link_add} to="/players/add/">
      <FontAwesomeIcon className={styles.icon_add} icon={faPlus} size="4x"/>
      <div>New player</div>
    </Link>
    {this.props.players && this.props.players.map(player =>
      <PlayerComponent key={player.id}
                       player={player}
                       onClick={() => this.handlePlayerSelect(player)}
                       selected={this.state.selected.find(p => p.id === player.id) !== undefined}/>)}
  </div>;

  renderGame = () =>
    this.state.selected.length === 4 ? <>
        <div className={styles.player_list_container}>
        {this.state.selected.map(player =>
          <PlayerComponent key={player.id}
                           player={player}
                           onClick={() => undefined}
                           selected/>)}
        </div>
        <div className={styles.start_game}>
          <Link to="/">Start game</Link>
        </div>
    </>
    : <Redirect to="/players"/>;

  render() {
    return <Base>
      <Switch>
        <Route path="/players/start" render={this.renderGame}/>
        <Route render={this.renderSelector}/>
      </Switch>
    </Base>;
  }
}

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  playersAdd: (name) => dispatch(playersAdd(name)),
  playersInit: () => dispatch(playersInit()),
})

const mapStateToProps = (state : State, ownProps : ContextRouter) : StateProps => ({
  players: state.page.type === 'PLAYERS' ? state.page.players : undefined,
});

const connected = connect<AllProps, ContextRouter, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(PlayerList);

export default withRouter(connected);
