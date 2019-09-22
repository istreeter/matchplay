// @flow

import React from 'react';
import {withRouter, type Match, type RouterHistory} from 'react-router-dom';

type Props = {|
  match: Match,
  history: RouterHistory
|};

const GameComponent = ({match, history}: Props) => {
  const id = parseInt(match.params['id']);
  if (isNaN(id)) {
    history.replace("/");
    return null;
  }
  return <div>{id}</div>
}

export default withRouter(GameComponent);
