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
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Content,
  Footer,
  FooterTab,
} from 'native-base';

import ActionButton from 'react-native-action-button';


export default class dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      avatarSource: null,
      pic:null
    }
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
            <Title style={styles.title}>Dashboard</Title>
          </Body>
        </Header>

        <Container>
          <Content />
          <Footer>
            <FooterTab>
              <Button vertical active>
                <Icon name="home" />
                <Text style={styles.text}>Home</Text>
              </Button>
              <Button vertical buttonColor='#0956a4' onPress={() => this.props.navigation.navigate('')}>
                <Icon name="add" />
                <Text style={styles.text}>Add Books</Text>
              </Button>
              <Button vertical buttonColor='#0956a4' onPress={() => console.log("notes tapped!")}>
                <Icon active name="cart" />
                <Text style={styles.text}>Cart</Text>
              </Button>
              <Button vertical buttonColor='#0956a4' onPress={() => { }}>
                <Icon active name="person" />
                <Text style={styles.text}>Profile</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>

      </Container>
    );
  }



}

const statusbarStyle = StyleSheet.create({
  statusBar: {
    paddingTop: Constants.statusBarHeight,
    height: 65,
    //backgroundColor: '#0956a4',
    // borderBottomColor: 'black',
    // borderBottomWidth: 0.5,
  },
});


const styles = StyleSheet.create({
  text:{
    color: '#D3D3D3'
  },
  container: {
    backgroundColor: '#F5F7F6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#0956a4',
    alignItems: 'center',
  },
  actionButtonIcon: {
    height: 18,
    color: 'white',
    fontSize: 20,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});