import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Profile extends React.Component {

    render() {

		return(
			<View style={styles.container}>
                <Text style={styles.text}> Welcome to the Initial Screen </Text>				
			</View>	
    )
    

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
          color: '#fff'
      }
});