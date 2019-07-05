import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';


export default class Signup extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
          email: "",
          username: "",
          password: "",
          password_confirm: "",
          phone_number: "",
          errors: [],
        };
      }
      static navigationOptions = {
        title: 'signup',
        
    }
    async onSignupPressed() {
      try {
        let response = await fetch('http://192.168.1.77:3000/signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: this.state.username,  
              email: this.state.email,
              password: this.state.password,
              password_confirm: this.state.password_confirm,
              phone_number: this.state.phone_number,
          })
        }) 

        let res = await response.json(); // receive data in json format from the server

        alert(res.message);

        if (res.success === true){
          alert('User Registered');
          this.props.navigation.navigate('login');
        }

        else if (res.success === false){
          alert('Sorry, username has already been taken');
        }
        
        else{
          let errors = res;
          throw errors;
        }
      }
        
      catch(errors){
          console.log('catch errors :' + errors);
      }
    }
      
   	render() {
     
		return(
			<View style={styles.container}>
				
                <View style={styles.mainConatiner}>
                    <View style={styles.inContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="User name"
                        keyboardType="default"
                        underlineColorAndroid='transparent'
                        onChangeText={(username) => this.setState({username})}/>
                    </View>

                    <View style={styles.inContainer}>
                        <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        value = {this.state.email}
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({email})}/>
                    </View>
                    
                    <View style={styles.inContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        value = {this.state.password}
                        onChangeText={(password) => this.setState({password})}/>
                    </View>

                    <View style={styles.inContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        value = {this.state.password_confirm}
                        onChangeText={(password_confirm) => this.setState({password_confirm})}/>
                    </View>

                    <View style={styles.inContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Phone Number"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        value = {this.state.phone_number}
                        onChangeText={(phone_number) => this.setState({phone_number})}/>
                    </View>

                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onSignupPressed('signup')}>
                    <Text style={styles.loginText}>SignUp</Text>
                    </TouchableHighlight>           
                    <View style={styles.signupContainer}>
                      <Text style={styles.signupText}>Already have an account?</Text>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
                    </View>
                </View>
		  </View>	
		)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#F5F7F6',
    flex: 1,  
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
    marginBottom:10,
    flexDirection: 'row',
    alignItems:'center',  
    color: '#000'  
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
  },
  icon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    width:250,
    borderRadius:5,    
    borderColor: "#332373",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#332373",
  },
  loginText: {
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
    color:"#332373",
  }
});

