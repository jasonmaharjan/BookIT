import React from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  } from 'react-native';
  
 import { createDrawerNavigator, DrawerItems, createAppContainer, createStackNavigator } from 'react-navigation';

import CategoryScreen from './app/views/category';
import AboutScreen from './app/views/about'
import HomeScreen from './app/views/home';

export default class App extends React.Component {
  render() {
    return (   

     <View style={styles.container}> 
        <Apps />
      </View>
      
    );
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style = {{ flex: 1 }}>
      <DrawerItems {...props} />
  </SafeAreaView>
)

const AppDrawerNav = createDrawerNavigator({
  "Home " : HomeScreen,
  "Category " : CategoryScreen,
  "About ": AboutScreen

}, {
  contentComponent : CustomDrawerComponent,
  contentOptions: {
      activeTintColor: '#e91e63',
    },
});
const Apps = createAppContainer(AppDrawerNav)



const styles = StyleSheet.create({
  container : {
    backgroundColor: '#F5F7F6',
    flex:1
  },
  logo : {
    backgroundColor: '#F5F7F6',
    flex:1
  },
});