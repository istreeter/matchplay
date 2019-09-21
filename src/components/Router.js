// @flow

import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const Loading = () => null;

const PlayerList = React.lazy(() => import('./PlayerList'));
const Home = React.lazy(() => import('./Home'));
const GameStart = React.lazy(() => import('./GameStart'));

export default (props: {}) =>
  <BrowserRouter>
    <Switch>
      <Suspense fallback={<Loading/>}>
        <Route path="/players/" exact component={PlayerList}/>
        <Route path="/game/start/" exact component={GameStart}/>
        <Route path="/" exact component={Home}/>
      </Suspense>
    </Switch>
  </BrowserRouter>
