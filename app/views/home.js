import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { Constants } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Item, Input } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { ThemeConsumer } from 'react-native-elements';


export default class HomeScreen extends React.Component {
  
  static navigationOptions = ({ screenProps }) => ({
    title: 'Home',
    headerTintColor: '#0956a4',
    headerLeft:(
      <Icon name='menu' onPress = {()=> screenProps.openDrawer()} style = {styles.header}/>
    )

})

  constructor(props) {
    super(props);

    this.state = {
      search: "",
      errors: [],
    };
  }

  static navigationOptions = ({ screenProps }) => ({
    title: 'Home',
    headerTintColor: '#0956a4',
    headerLeft:(
      <Icon name='menu' onPress = {()=> screenProps.openDrawer()} style = {styles.header}/>
    )
  })  

  async onSearchPressed() {
    try {
      let response = await fetch('http://192.168.1.77:3000/books', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            search: this.state.search
        })
      }) 

      let res = await response.json(); 

      if (res.success === false){
        alert('No Book Found in database');
      }

      else{
        this.props.navigation.navigate('search', {search_results: res});
      }
    }
      
    catch(errors){
        console.log('catch errors :' + errors);
    }
  }

  render() {
    return (
        <Container>
	
          <View style={styles.mainConatiner}>
            
              <View style={styles.inContainer}>

                <Icon name="search" />
                <TextInput style={styles.inputss}
                    placeholder="Search"
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={(search) => this.setState({search})}/>
                    <TouchableHighlight style={[styles.buttonContainer, styles.searchButton]} onPress={() => this.onSearchPressed('search')}>
                <Text style={styles.searchText}>GO</Text>
              </TouchableHighlight>

              </View>
              
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

const styles = StyleSheet.create({
  header:{
    marginLeft: 10,
    color: '#0956a4'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
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
    marginBottom: 150,
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
  },
  mainConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
  },
  inContainer: {
    borderBottomColor: '#A0A3A9',
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:100,
    flexDirection: 'row',
    alignItems:'center',  
    color: '#000'  
  },
  inputss:{
      height:45,
      marginLeft:10,
      borderBottomColor: '#FFFFFF',
  },
  buttonContainer: {
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    width:50,
    borderRadius:5,    
    borderColor: "#332373",
    marginLeft: 200,
    marginRight: 10,
    position: 'absolute'
  },
  searchButton: {
    backgroundColor: "#332373",
  },
  searchText: {
    color: '#fff',
    fontSize:18,
    fontWeight:'500',
  },
});