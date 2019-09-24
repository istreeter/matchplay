// @flow

import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import styles from './Router.module.css';

import Base from 'components/Base';

const errorBoundary = Component =>
  class extends React.PureComponent<{}, {hasError: boolean}> {
    constructor(props) {
      super(props);
      this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
      return {hasError: true};
    }

    render() {
      return this.state.hasError
        ? <Base>
           <h2>Something went wrong</h2>
          </Base>
        : <Component/>
    }
  }

const PlayerList = React.lazy(() => import('../PlayerList'));
const Home = React.lazy(() => import('../Home'));
const GameStart = React.lazy(() => import('../GameStart'));
const Game = React.lazy(() => import('../Game'));
const Archive = React.lazy(() => import('../Archive'));

const Loading = () => <Base>
  <FontAwesomeIcon className={styles.spinner} icon={faSpinner} spin/>
</Base>


export default (props: {}) =>
  <BrowserRouter>
    <React.Suspense fallback={<Loading/>}>
      <Switch>
        <Route path="/players/" exact component={errorBoundary(PlayerList)}/>
        <Route path="/archive/" exact component={errorBoundary(Archive)}/>
        <Route path="/game/start/" exact component={errorBoundary(GameStart)}/>
        <Route path="/game/:id/" exact component={errorBoundary(Game)}/>
        <Route path="/" component={errorBoundary(Home)}/>
      </Switch>
    </React.Suspense>
  </BrowserRouter>
