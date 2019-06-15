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
            <Title>Bookit</Title>
          </Body>
        </Header>
         <View style={styles.container}>
            <Text>BookIT is a mobile application designed to help students share their study materials and also gain some profit at the side HEHE.</Text>
        </View>
          </Container>
    );
  }
}

const statusbarStyle = StyleSheet.create({
    statusBar: {
      paddingTop: Constants.statusBarHeight,
      height:75,
      backgroundColor: '#0956a4',
    },
  });

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#F5F7F6',
    flex:1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  signupText: {
    fontSize:20,    
  },
});