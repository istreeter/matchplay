// @flow
import React from 'react';
import { Provider } from 'react-redux';

import logo from './logo.svg';
import store from 'matchplay/store';
import './App.css';
import Router from 'components/Router';
import Navigator from 'components/Navigator';

function App() {
  return (
    <Provider store={store}>
      <>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Navigator/>
        </header>
        <Router/>
      </>
    </Provider>
  );
}

export default App;
