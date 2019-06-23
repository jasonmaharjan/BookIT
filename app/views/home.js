import React from 'react';

import {
  StyleSheet,
  View,
Image,
Text,
StatusBar,
Dimensions,
TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Item, Input } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';


export default class HomeScreen extends React.Component {
   
  static navigationOptions = ({ screenProps }) => ({
    title: 'Home',
    headerTintColor: '#0956a4',
    headerLeft:(
      <Icon name='menu' onPress = {()=> screenProps.openDrawer()} style = {styles.header}/>
    )

})


  render() {
    return (
        <Container>
        <View searchBar style = {styles.container}>
         <Item style = {styles.searchBar}>
            <Icon name="search" />
            <Input placeholder="Search" />
            <Icon name="book" />
            <Button transparent>
            <Text>Search</Text>
          </Button>        
        </Item>
        </View> 
        <View style = {styles.content}>
         <Text style = {styles.heading} onPress = {()=> {this.props.navigation.navigate('login') }}>Login</Text>         
         <Text>OR</Text>
         <Text style = {styles.heading} onPress = {()=> {this.props.navigation.navigate('signup') }}>Signup</Text>  
         <Text style = {styles.description}>To Buy, Sell, Rent books and many more...</Text>  
         </View>      

          </Container>
    );
  }


}

const statusbarStyle = StyleSheet.create({
    statusBar: {
      paddingTop: Constants.statusBarHeight,
      height:75,
      backgroundColor: '#0956a4',
      
     // borderBottomColor: 'black',
     // borderBottomWidth: 0.5,
    },
  });

const styles = StyleSheet.create({
  header:{
    marginLeft: 10,
    color: '#0956a4'
  },
  container : {   
    alignItems : 'center',
    justifyContent : 'center',
  },
  title:{
    color: '#fff',
    alignItems: 'center',
  },
  searchBar : {
    width: 200,
    backgroundColor: '#F5F7F6',
  },
  content: {
    flex: 1.5,
    justifyContent:'center',
    alignItems:'center',
  },
  orText: {
    marginTop : 10,
  },
  description:{
    marginTop:28,
    fontStyle: 'italic'
  },
  heading : {
    marginVertical: 20,
    fontSize: 22,
    fontWeight: 'bold',
  }
});