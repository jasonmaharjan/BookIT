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
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
    }


  render() {
    return (
        <Container>
        
        <Header style={statusbarStyle.statusBar}>
          <Left>
            <Button transparent>
              <Icon name='menu' onPress={()=>{this.props.navigation.openDrawer()}} />
            </Button>
          </Left>
          <Body>
            <Title style = {styles.title}>FAQs</Title>
          </Body>
        </Header>
         <View style={styles.container}>
         <Text>1.	What is this app about?
         Ans: The app is a platform primarily aimed at students to easily buy and sell books within their area. It only works as a service provider and doesn’t involve in the actual process of book transaction. 


            <Text> 2.	How do I buy, sell or rent books?
                Ans: To buy, sell or rent books you must first be registered in the app and then login which you can do from our signup/login page.
                Then you will be able to add a book for rent/sell from the homepage adding the necessary details.
                You can buy book from recommendation or by searching for one.
                However, you can still browse through the app without having to login or register.

                3.	How do I pay for the book?

                Ans: The app is cash on delivery system. It uses your address data to give you your book at the doorstep. Contact service is also available for this purpose.

                4.	Why do I sell book using bookit?
                Ans: Bookit allows you gain monetary value by setting up your own price and negotiating the best price for your book!
              </Text>
            </Text>
            
        </View>
          </Container>
    );
  }

  _showSignup = () => {
    this.props.navigation.navigate('signup');
  };

}

const statusbarStyle = StyleSheet.create({
    statusBar: {
      paddingTop: Constants.statusBarHeight,
      height:65,
     // borderBottomColor: 'black',
     // borderBottomWidth: 0.5,
    },
  });

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#F5F7F6',
    flex:1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  title:{
    color: '#0956a4',
  },
  signupText: {
    fontSize:30,  
    color:'#3160CC', 
  },
  signupButton: {
      paddingBottom: 20,
  },
  loginButton: {
      paddingTop: 20,
  }
});