import React, {Component} from 'react';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import StackNavigator from './stackNavigator';
import DrawerTabNavigator from './dashboardTabNavigator';

import CategoryScreen from '../views/category';
import AboutScreen from '../views/about';
import FAQsScreen from '../views/faq';
import ContactusScreen from '../views/contactUs';
import dashboard from '../views/dashboard';
import add_books from '../views/add_books';

const AppDrawerNav = createDrawerNavigator({
  Home: { screen : StackNavigator},
  Dashboard: {screen:DrawerTabNavigator},
  About : {screen: AboutScreen},
  FAQs : {screen: FAQsScreen},
  Contact_Us : {screen: ContactusScreen},
  }, 
  {
    initialRouteName:'Dashboard',
    drawerWidth: 300,
    drawerPosition: 'left',
    contentOptions: {
        activeTintColor: '#0956a4',
       // activeBackgroundColor: "#0956a4",     


  },
});
const Apps = createAppContainer(AppDrawerNav)

export default class DrawerNavigator extends Component
{
  render(){
    return (
      <Apps />
    )
  }
};
