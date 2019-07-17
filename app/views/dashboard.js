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


const options={
  title: 'my pic app',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
}
export default class dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      avatarSource: null,
      pic:null
    }
  }

  myfun=()=>{
    //alert('clicked');
  /*
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      }
  
      else {
        let source = { uri: response.uri };
  
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
        this.setState({
          avatarSource: source,
          pic:response.data
        });
      }
    });*/
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



        <View style={styles.container1}>

            <Image source={this.state.avatarSource}
            style={{width:'100%',height:300,margin:10}}/>

          <TouchableOpacity style={{backgroundColor:'green',margin:10,padding:10}}
          onPress={this.myfun}>
            <Text style={{color:'#fff'}}>Select Image</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.uploadPic}>
            <Text>Upload</Text>
          </TouchableOpacity>


        </View>

 


        <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
          <ActionButton buttonColor="#0956a4">
            <ActionButton.Item buttonColor='#0956a4' title="My Cart" onPress={() => console.log("notes tapped!")}>
              <Icon name="md-cart" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#0956a4' title="Sell book" onPress={() => { }}>
              <Icon name="md-add" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#0956a4' title="Request book" onPress={() => console.log("notes tapped!")}>
              <Icon name="md-" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#0956a4' title="Donate book" onPress={() => { }}>
              <Icon name="md-" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>

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