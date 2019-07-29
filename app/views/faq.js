import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';
import { Constants } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [
        { id: 1, question: "What is this app about?",
          answer: " The app is a platform primarily aimed at students to easily buy and sell books within their area. It only works as a service provider and doesn’t involve in the actual process of book transaction." },
        { id: 2, question: "How do I buy, sell or rent books?", 
          answer: "To buy, sell or rent books you must first be registered in the app and then login which you can do from our signup/login page. Then you will be able to add a book for rent/sell from the homepage adding the necessary details.You can buy book from recommendation or by searching for one.However, you can still browse through the app without having to login or register." },
        { id: 3, question: "How do I pay for the book?", 
          answer: "The app is cash on delivery system. It uses your address data to give you your book at the doorstep. Contact service is also available for this purpose." },
        { id: 4, question: "Why do I sell book using bookit?", 
          answer: " Bookit allows you gain monetary value by setting up your own price and negotiating the best price for your book! " },
      ]
    };
  }


  render() {
    return (
      <Container>

        <Header style={statusbarStyle.statusBar}>
          <Left>
            <Button transparent>
              <Icon name='menu' onPress={() => { this.props.navigation.openDrawer() }} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>FAQs</Title>
          </Body>
        </Header>
        <View style={styles.container}>
          <FlatList
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.data}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.card}>
                  
                  <View style={styles.cardContent}>
                    <Text style={styles.question}>{item.question}</Text>
                    <Text style={styles.answer}>{item.answer}</Text>
                  </View>
                </TouchableOpacity>
              )
            }} />
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
    height: 65,
    // borderBottomColor: 'black',
    // borderBottomWidth: 0.5,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F7F6',
    flex: 1,
  },
  title: {
    color: '#0956a4',
  },
  signupText: {
    fontSize: 30,
    color: '#3160CC',
  },
  signupButton: {
    paddingBottom: 20,
  },
  loginButton: {
    paddingTop: 20,
  },
  
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10,
    marginRight: 20,
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius:30,
  },

  question:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    fontWeight:'bold'
  },
  answer:{
    fontSize:16,
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom:5,
  },

});