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
          fullname: "",
          password: ""
        };
      }
      
      onClickListener = (viewId) => {
       //Alert.alert("Alert", "SignUp Button click");
       this.navigation.navigate('login');
      }

 	render() {
     
		return(
			<View style={styles.container}>
				
                <View style={styles.mainConatiner}>
                    <View style={styles.inContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Full name"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(fullName) => this.setState({fullName})}/>
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
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('sign_up')}>
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
    borderColor: "#3160CC",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#3160CC",
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
    color:'blue',
  }
});