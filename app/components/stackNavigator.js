import React, { Component } from 'react';
import {createStackNavigator, createAppContainer, DrawerActions} from 'react-navigation';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';

import HomeScreen from '../views/home';
import signup from '../views/signup';
import login from '../views/login';

const AppStackNav = createStackNavigator(
    {
      Home: {screen: HomeScreen},
      login: {screen: login},
      signup: {screen: signup},
    },
    {
      initialRouteName: 'Home',
      //headerMode:"none",
      navigationOptions: {
        headerVisible: false,
               
      }
    } 
  )
  
const Application = createAppContainer(AppStackNav);

export default class StackNavigator extends Component{
    render(){
        return(
            <Application screenProps = {{openDrawer: () => this.props.navigation.dispatch(DrawerActions.openDrawer())}} />
        )
    }
};
