// @flow

import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

import type {Player} from 'matchplay/model';
import {playersAdd, playersInit} from 'matchplay/action-creators';
import type {State} from 'matchplay/reducers';
import type {Dispatch} from 'matchplay/actions';
import Base from 'components/Base';
import styles from './PlayerList.module.css';

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
  selected: $ReadOnlyArray<number>,
|};

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

  handlePlayerSelect = (i: number) => {
    const {selected} = this.state;
    const newSelected =
      selected.indexOf(i) === -1 ?
        [i, ...selected]
      : selected.filter(j => i !== j);
    this.setState({selected: newSelected});
  };

  renderPlayer = (player: Player, index: number) => {
    const iconClassName = this.state.selected.indexOf(index) >= 0 ?
        styles.selected : styles.unselected;
    return <div className={styles.player_grid_item}
                key={player.id}
                onClick={() => this.handlePlayerSelect(index)}>
      <div style={{color: player.color}}>
        <FontAwesomeIcon className={iconClassName} icon={faUser} size="4x"/>
      </div>
      <div>{player.name} </div>
      <div className={styles.player_stats}>won {player.won}, played {player.played}</div>
    </div>
  }

  render() {
    return <Base>
      <div className={styles.player_list_container}>
        <Link className={styles.link_add} to="/players/add/">
          <FontAwesomeIcon className={styles.icon_add} icon={faPlus} size="4x"/>
          <div>New player</div>
        </Link>
        {this.props.players && this.props.players.map(this.renderPlayer)}
      </div>
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
