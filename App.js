import React from 'react';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';

import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { image } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';


import CategoryScreen from './app/views/category';
import AboutScreen from './app/views/about'
import HomeScreen from './app/views/home';
import FAQsScreen from './app/views/faq';
import ContactusScreen from './app/views/contactUs';

import signup from './app/views/signup';
import login from './app/views/login';
import dashboard from './app/views/dashboard';
import profile from './app/views/profile';
import add_books from './app/views/add_books';
import donate_books from './app/views/donate_books';
import request_books from './app/views/request_books';
import imageUpload from  './app/views/imageUpload';
import bookDetails from  './app/views/bookDetails';

import Fontt from './Font';

const RootStack = createStackNavigator(
  {
    login: login,
    signup: signup,
    profile: profile,
    add_books: add_books,
    donate_books: donate_books,
    request_books: request_books,
    imageUpload: imageUpload,
    bookDetails: bookDetails,
  },
  {
    initialRouteName: 'bookDetails',
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    }
  }
)

const Application = createAppContainer(RootStack)

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        backgroundColor: '#fff',
        height: 140,
        color: '#0956a4',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#0956a4'

      }}
    >
      <Text>PROFILE</Text>
    </View>
    <DrawerItems {...props} />
  </SafeAreaView>
)

const AppDrawerNav = createDrawerNavigator({
  "Home ": HomeScreen,
  "Category ": CategoryScreen,
  "About ": AboutScreen,
  "FAQs": FAQsScreen,
  "Contact us": ContactusScreen,
  "dashboard": dashboard,
}, {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: "#0956a4",


    },
  });
const Apps = createAppContainer(AppDrawerNav)


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <View style={styles.container}>
        <Application />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F7F6',
    flex: 1
  },
});