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

export default class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
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
            <Title style={styles.title}>About us</Title>
          </Body>
        </Header>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <Text style ={styles.about}>
              Considering the fact that digital transaction of books has risen to popularity, we have decided to create a book app to enable users to buy and sell books.
            </Text>
            <Text  style ={styles.about1}>
              BookIT is easy to navigate and use so you can get going on it and gain some books or cash.
          </Text>
          </View>
        </View>
      </Container>
    );
  }
}

const statusbarStyle = StyleSheet.create({
  statusBar: {
    paddingTop: Constants.statusBarHeight,
    height: 65,
  },
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingTop:15,
    paddingBottom:15
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight:10,
    marginBottom: 10,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15,
    paddingBottom:15,
    //color: '#000'  
  },
  about:{
    textAlign: 'center',
    justifyContent:'center',
    alignItems:'center',
    fontSize: 16,
  },
  about1:{
    textAlign: 'center',
    justifyContent:'center',
    alignItems:'center',
    fontSize: 16,
    marginTop:15,
  },
  title: {
    color: '#0956a4'
  },
  signupText: {
    fontSize: 20,
  },
});