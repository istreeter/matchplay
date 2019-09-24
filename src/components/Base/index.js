// @flow

import * as React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import styles from './Base.module.css'
import type {State} from 'matchplay/state';
import logo from 'logo.svg';

type Props = {
  children?: React.Node,
}

export default ({children}: Props) => {
  const selected = useSelector((state: State) => state.selectedPlayers);

  return <>
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      <Link className={styles.link}
            to={selected.size === 4 ? "/game/start/" : "/players/"}>
        New Game
      </Link>
      <Link className={styles.link} to="/archive/">
        Archive
      </Link>
    </header>
    {children}
  </>;
}
