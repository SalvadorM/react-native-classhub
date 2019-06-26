/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

//import react-navigator 
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'


//Import Components
import LoginScreen from './components/user/Login'
import AuthLoading from './components/user//AuthLoading'
import HomeScreen from './components/home/Home'

// export default class App extends Component {
//   render() {

//     return (
//         <AuthLoading />
//     );
//   }
// }


const appStack = createStackNavigator({ Home: HomeScreen, })
const authStack = createStackNavigator({ SignIn: LoginScreen})

export default createAppContainer( createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: appStack,
    Auth: authStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
))