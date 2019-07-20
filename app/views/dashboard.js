import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  FlatList,
  AsyncStorage,

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
  Tab,
  Tabs,
} from 'native-base';

import ActionButton from 'react-native-action-button';

import AddBooksTab from './add_books';
import UserProfileTab from './userProfile';
import HomeTab from './profile';

import withBadge from '../components/badge';

const BadgedIcon = withBadge(69)(Icon);


const options={
  title: 'my pic app',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
}
export default class dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data: [],
      username: "",
    }
  }


  componentDidMount(){
    this.getData();
    this._loadUsername();
    // BackHandler.addEventListener('hardwareBackPress', this._backPressed);
  }

  _loadUsername = async () => {
    var value = await AsyncStorage.getItem('username');
    this.setState({username: value});
    
  }

  getData = () => {
    fetch('http://192.168.100.3:3000/allbooks')
    .then (result => result.json())
    .then((result) => {
      this.setState({
        data: result 
      })
     })
     .catch((error) => console.log(error));
  }

  logout(){
    this.removeToken();
  }

  removeToken = async() => {

    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    this.props.navigation.navigate('Home');
  }

  clickEventListener(book_details) {
    this.props.navigation.navigate('book_info', { book_details: book_details});
  }

  profileView() {
    this.props.navigation.navigate('userProfile');
  }

  async onSearchPressed() {
    try {
      let response = await fetch('http://192.168.100.3:3000/books', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search: this.state.search
        })
      })

      let res = await response.json();

      if (res.success === false) {
        alert('No Book Found in database');
      }

      else {
        this.props.navigation.navigate('search', { search_results: res });
      }
    }

    catch (errors) {
      console.log('catch errors :' + errors);
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

        <View style={styles.mainConatiner}>
          <View style={styles.inContainer}>
            <TextInput style={styles.inputss}
              placeholder="Title, author or category"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(search) => this.setState({ search })} />

            <TouchableHighlight onPress={() => this.onSearchPressed()}>
              <Icon name="search" style={styles.searchBar} />
            </TouchableHighlight>

          </View>
        </View>

        
      <Container>
        <Content/>
          <Footer>
            <FooterTab>
              <Button vertical active onPress={() => this.props.navigation.navigate('profile')}>
                <Icon name="home" />
                <Text style={styles.text}>Home</Text>
              </Button>
              <Button vertical buttonColor='#0956a4' onPress={() => this.props.navigation.navigate('add_books')}>
                <Icon name="add" />
                <Text style={styles.text}>Add Books</Text>
              </Button>
              <Button vertical buttonColor='#0956a4' onPress={() => alert('Cart icon Pressed')}>
                <Icon active name="cart" />
                <Text style={styles.text}>Cart</Text>
              </Button>
              <Button vertical buttonColor='#0956a4' onPress={() => this.props.navigation.navigate('userProfile')}>
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
  tabnav:{
    height:40,
    flex:1,
  },
  searchBar: {
    fontSize: 30,
  },
  container: {
    backgroundColor: '#F5F7F6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
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
  mainConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inContainer: {
    borderColor: '#0956a4',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: 10,
    width: 215,
    height: 45,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#000'
  },
  inputss: {
    height: 45,
    marginLeft: 2,
    borderBottomColor: '#0956a4',
    paddingHorizontal: 5,
    width: 180,
    fontSize: 15,
  },
  icon: {
    width:40,
    height:40,
  },  
  list: {
    marginTop: 250,
    paddingHorizontal: 15,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
  },
  card:{
    shadowColor: '#00000021',

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor:"white",
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 200,
    width: 150,
    alignSelf:'center'
  },
  title:{
    fontSize:15,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
});