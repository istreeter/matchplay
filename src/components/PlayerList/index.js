// @flow

import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {withRouter, type RouterHistory} from 'react-router';

import type {Player} from 'matchplay/model';
import playersSelected from 'matchplay/action-dispatchers/players-selected';
import playersInit from 'matchplay/action-dispatchers/players-init';
import type {State} from 'matchplay/state';
import type {Dispatch} from 'matchplay/actions';
import Base from 'components/Base';
import styles from './PlayerList.module.css';
import PlayerAdd from './PlayerAdd';

type StateProps = {|
  players?: $ReadOnlyArray<Player>,
  selected: $ReadOnlyArray<Player>,
|}

type OwnProps = {|
  history: RouterHistory,
|}

type DispatchProps = {|
  playersInit: () => mixed,
  playersSelected: ($ReadOnlyArray<Player>) => mixed,
|}

type AllProps = {|
  ...StateProps,
  ...OwnProps,
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
      <div>won {player.won}, played {player.played}</div>
    </div>
}

class PlayerList extends React.PureComponent<AllProps> {

  componentDidMount() {
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

  renderHelpText = () => {
    const needed = 4 - this.props.selected.length;
    const msg = needed === 4 ? '4'
              : needed > 0 ? `${needed} more`
              : '';
    return <div className={styles.helpText}>
      Select {msg} player{needed > 1 ? 's' : ''} to start a game
      </div>

  }

  render() {
    return <Base>
      {this.renderHelpText()}
      <div className={styles.playerListContainer}>
        <PlayerAdd/>
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
  playersInit: playersInit(dispatch),
  playersSelected: playersSelected(dispatch),
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  players: state.players,
  selected: state.selectedPlayers,
});

const connected = connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(PlayerList);

export default withRouter(connected);
