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
         <Text>FAQs content here</Text>
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
      height:75,
      backgroundColor: '#0956a4',
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
      color: '#fff',
    alignItems: 'center',
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