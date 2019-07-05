import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
/*
import ImagePicker from 'react-native-image-picker';
import RNFetch from 'rn-fetch-blob';*/
import { ScrollView } from 'react-native-gesture-handler';

/*
const titleConfig = {
  title: 'Add a Book!',
};

const options={
  title: 'Book IT',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
}*/


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
          image_URL: "", 
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
          image_URL: this.state.image_URL,
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
      <ScrollView>
        <View style={styles.container}>
          
                  <View style={styles.mainConatiner}>
                    <Text>Please Fill out the following fields.</Text>
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
                          placeholder="your username"
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

                      <View style={styles.inContainer}>
                      <TextInput style={styles.inputs}
                          placeholder="image link"
                          keyboardType = "default"    
                          value = {this.state.image_URL}                    
                          underlineColorAndroid='transparent'                        
                          onChangeText={(image_URL) => this.setState({image_URL})}/>
                      </View>

                      <TouchableHighlight style={[styles.buttonContainer, styles.addBookButton]} onPress={() => this.onAddbookPressed('add_books')}>
                          <Text style={styles.addBookText}>Add Book</Text>
                      </TouchableHighlight>           
                </View>
        </View>	
      </ScrollView>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#F5F7F6',
    flex: 1, 
     
  },
  mainConatiner: {
    marginTop: 20,
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
    marginTop: 10,
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
  addBookButton: {
    backgroundColor: "#332373",
  },
  addBookText:{
    color: '#fff',
    fontSize:18,
    fontWeight:'500',
  },
});

