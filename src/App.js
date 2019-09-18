// @flow
import React from 'react';
import { Provider } from 'react-redux';

import store from 'matchplay/store';
import Router from 'components/Router';

function App() {
  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  );
}

export default App;
