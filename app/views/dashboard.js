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
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
import ActionButton from 'react-native-action-button';

export default class dashboard extends React.Component {
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
            <Title style = {styles.title}>Dashboard</Title>
          </Body>
        </Header> 

        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>        
          <ActionButton buttonColor="#0956a4">
            <ActionButton.Item buttonColor='#0956a4' title="Request book" onPress={() => console.log("notes tapped!")}>
              <Icon name="md-" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#0956a4' title="My Cart"  onPress={() => console.log("notes tapped!")}>
              <Icon name="md-cart" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#0956a4' title="Rent book"  onPress={() => {}}>
              <Icon name="md-add" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#0956a4' title="Donate book" onPress={() => {}}>
              <Icon name="md-" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
        
    </Container>
    );
  }

 

}


console.log(Constants.statusBarHeight)
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
    alignItems : 'center',
    justifyContent : 'center'
  },
  title:{
      color: '#0956a4',
    alignItems: 'center',
  },
  actionButtonIcon: {
    height: 18,
    color: 'white',
    fontSize: 20,
  },
});