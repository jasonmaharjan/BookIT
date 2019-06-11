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

import NavigationBar from 'react-native-navbar';

    const titleConfig = {
        title: 'Add a Book!',
    };


export default class Signup extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
          ISBN: "",
          title: "",
          author: "",
          price: "",
          edition: "",
          username: "",
          description: "",
          errors: [],
        };
      }

    async onAddbookPressed() {
      try {
        let response = await fetch('http://192.168.1.77:3000/addbook', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          ISBN: this.state.ISBN,
          title: this.state.title,
          author: this.state.author,
          price: this.state.price,
          edition: this.state.edition,
          username: this.state.username,
          description: this.state.description,
          })
        }) 

        let res = await response.json(); // receive data in json format from the server as 'res'

        if (res.success === true){
          alert('Book Added');
          this.props.navigation.navigate('profile');
        }
        
        else{
          alert(res.message);
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
                        placeholder="ISBN"
                        keyboardType="default"
                        value = {this.state.ISBN}
                        underlineColorAndroid='transparent'
                        onChangeText={(ISBN) => this.setState({ISBN})}/>
                    </View>

                    <View style={styles.inContainer}>
                        <TextInput style={styles.inputs}
                        placeholder="title"
                        keyboardType="default"
                        value = {this.state.title}
                        underlineColorAndroid='transparent'
                        onChangeText={(title) => this.setState({title})}/>
                    </View>
                    
                    <View style={styles.inContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="author"
                        keyboardType = "default"
                        underlineColorAndroid='transparent'
                        value = {this.state.author}
                        onChangeText={(author) => this.setState({author})}/>
                    </View>

                    <View style={styles.inContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="price"
                        keyboardType = "default"                        
                        underlineColorAndroid='transparent'
                        value = {this.state.price}
                        onChangeText={(price) => this.setState({price})}/>
                    </View>

                    <View style={styles.inContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="edition"
                        keyboardType = "default"
                        value = {this.state.edition}                        
                        underlineColorAndroid='transparent'
                        onChangeText={(edition) => this.setState({edition})}/>
                    </View>

                    <View style={styles.inContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="username"
                        keyboardType = "default"           
                        value = {this.state.username}             
                        underlineColorAndroid='transparent'
                        onChangeText={(username) => this.setState({username})}/>
                    </View>

                    <View style={styles.inContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="description"
                        keyboardType = "default"    
                        value = {this.state.description}                    
                        underlineColorAndroid='transparent'                        
                        onChangeText={(description) => this.setState({description})}/>
                    </View>

                    <TouchableHighlight style={[styles.buttonContainer, styles.addBookButton]} onPress={() => this.onAddbookPressed('add_books')}>
                        <Text style={styles.addBookText}>Add Book</Text>
                    </TouchableHighlight>           
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
    borderColor: "green",
    marginTop: 20,
  },
  addBookButton: {
    backgroundColor: "green",
  },
  addBookText:{
    color: '#fff',
    fontSize:18,
    fontWeight:'500',
  },
});

