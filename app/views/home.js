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
  AsyncStorage,
} from 'react-native';
import { Constants } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Item, Input } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { ThemeConsumer } from 'react-native-elements';
import withBadge from '../components/badge';

const BadgedIcon = withBadge(1)(Icon);

import {search_books} from "../api/api"


export default class HomeScreen extends React.Component {

  static navigationOptions = ({ screenProps }) => ({
    title: 'BOOK IT',
    headerTintColor: '#0956a4',
    /*
    headerLeft: (
      <Icon name='menu' onPress={() => screenProps.openDrawer()} style={styles.header} />
    ),*/
    headerRight:(
      <BadgedIcon
      name="cart" color="white" containerStyle={styles.cart}
    />
    ),

  })

  constructor(props) {
    super(props);

    this.state = {
      search: "",
      errors: [],
    };
  }

  componentDidMount() {
    this.checkToken();
  }


 
  checkToken = async () => {
    var value = await AsyncStorage.getItem('token');
    if (value != null) {
      this.props.navigation.navigate('dashboard');
    }
  }

  async onSearchPressed() {

      let res = await search_books({ search: this.state.search});

      if (res.data.success === false) {
        alert('No Book Found in database');
      }

      else {
        this.props.navigation.navigate('search', { search_results: res.data });
      }
  }

  render() {
    return (
      <Container>
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

        <View style={styles.content}>
          <Text style={styles.heading} onPress={() => { this.props.navigation.navigate('login') }}>Login</Text>
          <Text>OR</Text>
          <Text style={styles.heading} onPress={() => { this.props.navigation.navigate('signup') }}>Sign-Up</Text>
          <Text style={styles.description}>To Buy, Sell, Rent books and many more...</Text>
        </View>

      </Container>
    );

  }
}

const styles = StyleSheet.create({
  cart:{
    paddingRight: 50,
    color:'#0956a4',       
  },
  padRight:{
    paddingRight: 30
  },
  header: {
    marginLeft: 10,
    color: '#0956a4'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    alignItems: 'center',
  },
  searchBar: {
    fontSize: 30,
  },
  content: {
    flex: 1.5,
    marginBottom: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    marginTop: 10,
  },
  description: {
    marginTop: 28,
    fontStyle: 'italic',
    fontSize: 16,
  },
  heading: {
    marginVertical: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  mainConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inContainer: {
    borderColor: '#332373',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: 10,
    width: 215,
    height: 45,
    marginBottom: 100,
    marginTop: 50,
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
  buttonContainer: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 50,
    borderRadius: 5,
    borderColor: "#0956a4",
    marginLeft: 180,
    marginRight: 10,
    position: 'absolute',
    backgroundColor: '#F48024'
  },
  searchText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});