import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

export default class profile extends React.Component {

  render() {

      return(
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.text}> WELCOME TO BOOKIT!! </Text>				
          </View>	 
        </View> 
      );
    }
  }

const styles = StyleSheet.create({
    container : {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#F5F7F6',
        justifyContent: 'center'  
      },
      text: {
          color: '#000'
      }
});