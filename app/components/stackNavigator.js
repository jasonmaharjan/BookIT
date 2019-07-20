import React, { Component } from 'react';
import {createStackNavigator, createAppContainer, DrawerActions} from 'react-navigation';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';
import DrawerTabNavigator from './dashboardTabNavigator';

import HomeScreen from '../views/home';
import signup from '../views/signup';
import login from '../views/login';
import profile from '../views/profile';
import add_books from '../views/add_books';
import search from '../views/search_results';
import book_info from '../views/book_info';
import userBought from '../views/userBought';
import userProfile from '../views/userProfile';
import userSold from '../views/userSold';
import userUploads from '../views/userUploads';
import dashboard from '../views/dashboard';

const AppStackNav = createStackNavigator(
    {
      Home: {screen : HomeScreen},
      login: {screen : login},
      signup: {screen : signup},
      profile: {screen : profile},
      add_books: {screen : add_books, navigationOptions: {
        header: null,
               
      }},
      dashboardTab: {
        screen: DrawerTabNavigator,
      },
      search: {screen : search},
      book_info: {screen: book_info},
      userBought: {screen: userBought},
      userProfile: {screen: userProfile},
      userSold: {screen: userSold},
      userUploads: {screen: userUploads},
      dashboard: {
        screen: dashboard,
        navigationOptions: {
          header: null,
                 
        }},
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
