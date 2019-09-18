// @flow

import React from 'react';
import {Link} from 'react-router-dom';

import styles from "./Base.module.css"
import logo from 'logo.svg';

type Props = {
  children?: React.Node,
}

export default (props: Props ) =>
  <div className={styles.container}>
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
    </header>
    <div className={styles.content}>
      {props.children}
    </div>
  </div>
