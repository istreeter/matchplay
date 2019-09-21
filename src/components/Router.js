// @flow

import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const Loading = () => null;

const PlayerList = React.lazy(() => import('./PlayerList'));
const PlayerAdd = React.lazy(() => import('./PlayerAdd'));
const Home = React.lazy(() => import('./Home'));
const GameStart = React.lazy(() => import('./GameStart'));

export default (props: {}) =>
  <BrowserRouter>
    <Switch>
      <Suspense fallback={<Loading/>}>
        <Route path="/players/add/" exact component={PlayerAdd}/>
        <Route path="/players/" exact component={PlayerList}/>
        <Route path="/game/start/" exact component={GameStart}/>
        <Route path="/" component={Home}/>
      </Suspense>
    </Switch>
  </BrowserRouter>
