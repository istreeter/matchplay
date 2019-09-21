// @flow

import React from 'react';
import {Link} from 'react-router-dom';

import logo from 'logo.svg';
import styles from './Home.module.css';

export default () =>
  <div className={styles.container}>
    <div className={styles.bar1}>
      The Matt Evans super match play app
    </div>
    <div className={styles.bar2}>
      <Link className={styles.button} to="/players/">Get started</Link>
    </div>
    <img className={styles.img} src={logo} alt="logo" />
  </div>;
