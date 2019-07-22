import React, { Component } from 'react';
import {createStackNavigator, createAppContainer, DrawerActions} from 'react-navigation';


import HomeScreen from '../views/home';
import signup from '../views/signup';
import login from '../views/login';
import search from '../views/search_results'
import book_info from '../views/book_info';


const AppStackNav = createStackNavigator(
    {
        Home: {screen : HomeScreen},
        login: {screen : login},
        signup: {screen : signup},
        search:{screen:search},
        book_info:{screen:book_info}
    },  
    {
      initialRouteName: 'Home',
      navigationOptions: {
        headerVisible: false,
               
      }
    } 
  )
  
export default createAppContainer(AppStackNav);

