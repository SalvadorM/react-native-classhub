/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import { StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

//import react-navigator 
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'


//Import Components
import LoginScreen from './components/user/scenes/Login'
import AuthLoading from './components/user/components/AuthLoading'
import HomeScreen from './components/home/Home'

const authStack = createStackNavigator({ SignIn: {screen: LoginScreen} })

export default createAppContainer( createSwitchNavigator(
  {
    AuthLoading: {screen: AuthLoading},
    Home: {screen: HomeScreen},
    Auth: {screen: authStack},
  },
  {
    initialRouteName: 'AuthLoading'
  }
))