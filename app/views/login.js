import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert,
  FlatList,
  AsyncStorage,
} from 'react-native';
//import console = require('console');

var connection = require('../../config');

export default class Login extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        email: "",
        password: ""
      };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {

    //get email of user and check if user has logged in

    var value = await AsyncStorage.getItem('user');
    if (value !== null){
      this.props.navigation.navigate('profile');
    }

  }

  login =() => {

    fetch('http://192.168.100.3:3000/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })  
    
    .then((response) => response.json())
    .then((res) => {
      
      console.log(res.message);

      if (res.success === true){   //if input credentials are valid

        AsyncStorage.setItem('user', res.email);
        this.props.navigation.navigate('profile');
      }

      else{
        alert(res.message);
      }
    }).done();
  }

  render() {

  return(
    <View style={styles.container}>

      <View style={styles.mainConatiner}>        
                <View style={styles.inContainer}>
                  <Image style={styles.icon} source={require("../icons/icons-user-male-50.png")} />
                      <TextInput style={styles.inputs}
                      placeholder="Email"
                      keyboardType="email-address"
                      value = {this.state.email}
                      underlineColorAndroid='transparent'
                      onChangeText={(email) => this.setState({email})}/>
                  </View>

                  <View style={styles.inContainer}>
                  <Image style={styles.icon} source={require("../icons/icons-key-50.png")} />
                  <TextInput style={styles.inputs}
                      placeholder="Password"
                      secureTextEntry={true}
                      returnKeyType="go"
                      underlineColorAndroid='transparent'
                      value = {this.state.password}
                      onChangeText={(password) => this.setState({password})}/>
                  </View>

                  <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.login('login')}>
                  <Text style={styles.loginupText}>Login</Text>
                  </TouchableHighlight>
                  <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Don't have an account yet?</Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('signup')}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
                </View>
      </View>		
    </View>	
  );

  }
  
}

const styles = StyleSheet.create({
   
  mainConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inContainer: {
    borderBottomColor: '#A0A3A9',
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:10,
    flexDirection: 'row',
    alignItems:'center',  
    color: '#000'  
  },
  inputs:{
      height:45,
      borderBottomColor: '#FFFFFF',
      },
  icon:{
    width:25,
    height:25,
    marginLeft:5,   
    justifyContent: 'center',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    width:250,
    borderRadius:5,    
    borderColor: "#3160CC",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#3160CC",
  },
  loginupText:{
    color: '#fff',
    fontSize:18,
    fontWeight:'500',
  },
  signupContainer:{
    marginLeft: -15,
    marginTop :10,
  },
  signupText: {
  	color:'#000',
    fontSize:16,    
  },
  signupButton: {
  	fontSize:16,
    fontWeight:'500',
    color:'blue',
  }
});
