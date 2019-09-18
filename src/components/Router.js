// @flow

import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import PlayerList from './PlayerList';
import Home from './Home';

export default (props: {}) =>
  <BrowserRouter>
    <Switch>
      <Route path="/players/" exact component={PlayerList}/>
      <Route path="/" component={Home}/>
    </Switch>
  </BrowserRouter>
