/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import { createAppContainer } from 'react-navigation';
import AppNavigator from '../client_side/src/screens/AppNavigator'


const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component{
  render() {
    return <AppContainer />;
  }
};
