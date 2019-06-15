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
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Item, Input } from 'native-base';

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
            <Title style = {styles.title}>Home</Title>
          </Body>
        </Header>
         <View searchBar style = {styles.container}>
         <Item style = {styles.searchBar}>
            <Icon name="search" />
            <Input placeholder="Search" />
            <Icon name="book" />
            <Button transparent>
            <Text>Search</Text>
          </Button>
          </Item>
          
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
    alignItems : 'center',
    justifyContent : 'center',
  },
  title:{
      color: '#fff',
    alignItems: 'center',
  },
  searchBar : {
    width: 200,
  }
});