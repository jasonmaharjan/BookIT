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

export default class CategoryScreen extends React.Component {
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
            <Title style={styles.title}>Category</Title>
          </Body>
        </Header>
         <View style={styles.container}>
           <Text>Category Here....</Text>
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
    color:'#0956a4'
  },
  signupText: {
    fontSize:20,    
  },
});