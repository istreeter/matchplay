// @flow

import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {withRouter, type ContextRouter} from 'react-router';

import type {Player} from 'matchplay/model';
import {playersMiddlewareAdd, playersAdd, playersInit, playersSelected} from 'matchplay/action-creators';
import type {State} from 'matchplay/state';
import type {Dispatch} from 'matchplay/actions';
import Base from 'components/Base';
import styles from './PlayerList.module.css';

type StateProps = {|
  players?: $ReadOnlyArray<Player>,
  selected: $ReadOnlyArray<Player>,
|}

type DispatchProps = {|
  playersMiddlewareAdd : () => mixed,
  playersAdd: string => mixed,
  playersInit: () => mixed,
  playersSelected: ($ReadOnlyArray<Player>) => mixed,
|}

type AllProps = {|
  ...StateProps,
  ...ContextRouter,
  ...DispatchProps,
|}


type PlayerProps = {|
  selected: boolean,
  player: Player,
  onClick: () => mixed,
|};

const PlayerComponent = ({selected, player, onClick}: PlayerProps) => {

    const selectedClass = selected ?  styles.selected : styles.unselected;
    const style = selected ? {borderColor: player.color} : undefined;
    const iconStyle = selected ? {color: player.color} : undefined;

    return <div className={`${styles.playerGridItem} ${selectedClass}`}
                style={style}
                onClick={onClick}>
      <FontAwesomeIcon className={styles.icon} style={iconStyle} icon={faUser} size="4x"/>
      <div>{player.name} </div>
      <div className={styles.player_stats}>won {player.won}, played {player.played}</div>
    </div>
}

class PlayerList extends React.PureComponent<AllProps> {

  componentDidMount() {
    this.props.playersMiddlewareAdd();
    this.props.playersInit();
  }

  handlePlayerSelect = (p: Player) => {
    const {selected} = this.props;
    const newSelected =
      selected.find(p2 => p2.id === p.id) === undefined
      ? [p, ...selected]
      : selected.filter(p2 => p.id !== p2.id);
    this.props.playersSelected(newSelected);
    if (newSelected.length === 4) {
      this.props.history.push("/game/start");
    }
  };

  render() {
    return <Base>
      <div className={styles.playerListContainer}>
        <Link className={styles.linkAdd} to="/players/add/">
          <FontAwesomeIcon className={styles.iconAdd} icon={faPlus} size="4x"/>
          <div>New player</div>
        </Link>
        {this.props.players && this.props.players.map(player =>
          <PlayerComponent key={player.id}
                           player={player}
                           onClick={() => this.handlePlayerSelect(player)}
                           selected={this.props.selected.find(p => p.id === player.id) !== undefined}/>)}
      </div>;
    </Base>;
  }
}

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  playersMiddlewareAdd: () => dispatch(playersMiddlewareAdd()),
  playersAdd: (name) => dispatch(playersAdd(name)),
  playersInit: () => dispatch(playersInit()),
  playersSelected: (players) => dispatch(playersSelected(players)),
})

const mapStateToProps = (state : State, ownProps : ContextRouter) : StateProps => ({
  players: state.players,
  selected: state.selectedPlayers,
});

const connected = connect<AllProps, ContextRouter, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(PlayerList);

export default withRouter(connected);
