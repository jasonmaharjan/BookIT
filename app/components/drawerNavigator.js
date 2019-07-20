import React, {Component} from 'react';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import StackNavigator from './stackNavigator';

import CategoryScreen from '../views/category';
import AboutScreen from '../views/about';
import FAQsScreen from '../views/faq';
import ContactusScreen from '../views/contactUs';
import dashboard from '../views/dashboard';
import Profile from '../views/userProfile';

const AppDrawerNav = createDrawerNavigator({
  Home : {screen : StackNavigator },
  Category : {screen : CategoryScreen},
  About : {screen: AboutScreen},
  FAQs : {screen: FAQsScreen},
  Contact_Us : {screen: ContactusScreen},
  dashboard: {screen: dashboard},
  Profile: {screen: Profile}
  }, 
  {
    initialRouteName:'Profile',
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
