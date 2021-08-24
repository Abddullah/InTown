import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Routes from './src/Navigation/index'
import store from './src/store';

export default class App extends React.Component {
  UNSAFE_componentWillMount() {
    console.disableYellowBox = true
  }
  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <Routes />
      </Provider>
    );
  }
}

