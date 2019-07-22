import React, { Component } from 'react';
import {createStackNavigator, createAppContainer, DrawerActions} from 'react-navigation';
import profile from '../views/profile';
import add_books from '../views/add_books';
import search from '../views/search_results';
import book_info from '../views/book_info';
import userBought from '../views/userBought';
import userProfile from '../views/userProfile';
import userSold from '../views/userSold';
import userUploads from '../views/userUploads';



const AppStackNav = createStackNavigator(
    {
      profile: {screen : profile,header:null},
      add_books: {screen : add_books, navigationOptions: {
        header: null,          
      }},
      search: {screen : search},
      book_info: {screen: book_info},
      userBought: {screen: userBought},
      userProfile: {screen: userProfile},
      userSold: {screen: userSold},
      userUploads: {screen: userUploads},
    },
    {
      initialRouteName: 'profile',
      //headerMode:"none",
      navigationOptions: {
        headerVisible: false,
               
      }
    } 
  )
  
export default createAppContainer(AppStackNav);

