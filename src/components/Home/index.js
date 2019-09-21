// @flow

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import type {State} from 'matchplay/state';
import type {Dispatch} from 'matchplay/actions';
import {homeInit} from 'matchplay/action-creators';
import logo from 'logo.svg';
import styles from './Home.module.css';

type StateProps = {|
  xxx: void,
|}

type OwnProps = {|
|}

type DispatchProps = {|
  homeInit: () => mixed,
|}

type AllProps = {|
  ...StateProps,
  ...OwnProps,
  ...DispatchProps,
|}

const Component = ({homeInit}: AllProps) => {
  useEffect(() => {
    homeInit()
  }, [homeInit]);

  return <div className={styles.container}>
      <div className={styles.bar1}>
        The Matt Evans super match play app
      </div>
      <div className={styles.bar2}>
        <Link className={styles.button} to="/players/">Get started</Link>
      </div>
      <img className={styles.img} src={logo} alt="logo" />
    </div>;
}

const mapDispatchToProps = (dispatch : Dispatch) : DispatchProps => ({
  homeInit: () => dispatch(homeInit()),
})

const mapStateToProps = (state : State, ownProps : OwnProps) : StateProps => ({
  xxx: undefined,
});

export default connect<AllProps, OwnProps, StateProps, DispatchProps, State, Dispatch>(mapStateToProps, mapDispatchToProps)(Component);
