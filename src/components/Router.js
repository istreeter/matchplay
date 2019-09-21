// @flow

import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import PlayerList from './PlayerList';
import PlayerAdd from './PlayerAdd';
import Home from './Home';

export default (props: {}) =>
  <BrowserRouter>
    <Switch>
      <Route path="/players/add/" exact component={PlayerAdd}/>
      <Route path="/players/" component={PlayerList}/>
      <Route path="/" component={Home}/>
    </Switch>
  </BrowserRouter>
