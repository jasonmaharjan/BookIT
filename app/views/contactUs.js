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

export default class ContactusScreen extends React.Component {
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
            <Title style = {styles.title}>Contact Us</Title>
          </Body>
        </Header>
         <View style={styles.container}>
                 <View style={{borderColor:'#a6a6a6',borderWidth:1, paddingHorizontal:10,marginVertical:10}}>
                  <Text style = {styles.contact}>Contact Us </Text>
                  <Text>KU, Dhulikhel</Text>
                  <Text>Tel: +977-9808753822</Text>
                  <Text>Email: mongolianurina@gmail.com</Text>
                  </View>           
        </View>
          </Container>
    );
  }

 }

const statusbarStyle = StyleSheet.create({
    statusBar: {
      paddingTop: Constants.statusBarHeight,
      height:65,
      //backgroundColor: '#0956a4',
     // borderBottomColor: 'black',
     // borderBottomWidth: 0.5,
    },
  });

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#F5F7F6',
    flex:1,
    //justifyContent : 'center',
    paddingHorizontal : 15
  },
  title:{
    color: '#0956a4',
  },
   contactWrapper: {
    borderColor : '#a6a6a6',
    borderWidth : 0.3,
  },
  contact : {
      fontWeight : "bold",
      fontSize:20,
      marginBottom: 10,
  },
});