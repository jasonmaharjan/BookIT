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
            <Title style={styles.title}>About us</Title>
          </Body>
        </Header>
         <View style={styles.container}>
            <Text style={{marginLeft: 10, marginBottom: 20}}>
              With advances in technology, digital transaction of books has risen to popularity. Considering this fact, we have decided to create a book app for buy and sell to enable users to access to gain a book or put one up for sale. The concept of this app is to have utilization of the books that may have been just laying around. The app solves the problem of having unutilized book in user’s shelf by enabling the user to sell for monetary gain while other users can get cheap books.
              It is easy to navigate and use so you can get going on it and gain some books or cash.

            </Text>
        </View>
          </Container>
    );
  }
}

const statusbarStyle = StyleSheet.create({
    statusBar: {
      paddingTop: Constants.statusBarHeight,
      height:65,
    },
  });

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#F5F7F6',
    flex:1,
    alignItems : 'center',
    justifyContent : 'center',
  },
  title:{
    color:'#0956a4'
  },
  
  signupText: {
    fontSize:20,    
  },
});