// @flow

import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Base from './Base';

const Loading = () => <Base/>

const PlayerList = React.lazy(() => import('./PlayerList'));
const Home = React.lazy(() => import('./Home'));
const GameStart = React.lazy(() => import('./GameStart'));
const Game = React.lazy(() => import('./Game'));
const Archive = React.lazy(() => import('./Archive'));

export default (props: {}) =>
  <BrowserRouter>
    <Suspense fallback={<Loading/>}>
      <Switch>
        <Route path="/players/" exact component={PlayerList}/>
        <Route path="/archive/" exact component={Archive}/>
        <Route path="/game/start/" exact component={GameStart}/>
        <Route path="/game/:id/" exact component={Game}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Suspense>
  </BrowserRouter>
