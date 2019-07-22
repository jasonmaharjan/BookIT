import React, {Component} from 'react';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import StackNavigator from './stackNavigator';
import DrawerTabNavigator from './dashboardTabNavigator';
import AboutScreen from '../views/about';
import FAQsScreen from '../views/faq';
import ContactusScreen from '../views/contactUs';


const AppDrawerNav = createDrawerNavigator({
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
