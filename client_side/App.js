/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import MapScreen from "./src/screens/MapScreen";

import { createAppContainer } from 'react-navigation';
import AppNavigator from '../client_side/src/screens/AppNavigator'
import Login from '../client_side/src/screens/Login'


const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component{
  render() {
    return <AppContainer />;
  }
};


