import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  AsyncStorage,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import {Icon} from 'native-base';
import StoreContext from '../Store/StoreContext';


const titleConfig = {
  title: 'BOOK DETAILS',
};

class BookInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cart:[],
      user: "",
    };
  }

  componentWillMount() {
    this._loadUsername();
  }

  addToCart = (cartItem)=>{
    cart = this.state.cart;
    this.setState({cart : cartItem});

    if(!this.props.storeData.isUserLoggedIn){
      this.props.navigation.navigate('login')
    }
    else{
      alert("Item added")
    }
  }

  addItemCount=(bookId,value=1)=>{
    const cart = this.state.cart;
    let i = 0
    for(items in cart){
      if(items.bookId === bookId){
        newItems= {...items, count:count+value}
        cart[i] = newItems;
        break;
      }
      i++;
    }
    this.setState({cart:cart});
  }

  deleteFromCount(cartItem){
  const cart = this.state.cart;
  let newCart = []
  for(items in cart){
    if(items.bookId !== cartItem.bookId){
      newCart.push(items);
    }
  }
  this.setState({cart:newCart});
  }

  _loadUsername = async () => {
    var value = await AsyncStorage.getItem('username');
    this.getuserdata(value);
  }

    async getuserdata(username) {
      try {
        let response = await fetch('http://172.17.3.187:3000/username', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username
          })
        })
  
        let res = await response.json(); // receive data in json format from the server

        this.setState({user:res.phone_number});
      }
  
      catch (errors) {
        console.log('catch errors :' + errors);
      }
  }

  render() {

    const book_details = this.props.navigation.state.params.book_details
    const image_URL = book_details['image_URL'];

    return (
      <View style={styles.container}>
        <View >
          <NavigationBar
            title={titleConfig}
          />
          <View style={styles.details}>            
            <View style = {styles.leftContent}>
              <View style = {styles.cardImage}>
                <Image style={styles.cardImage} source={{uri:image_URL }}/>
              </View>
              <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.addToCart(book_details)}>
              <Text style={styles.loginupText}>Add to cart</Text>
            </TouchableHighlight>
            </View>

            <View style = {styles.description}>
              <Text style = {styles.title}>{book_details['title']}</Text>
              <Text>Author: {book_details['author']}</Text>
              <Text>Edition: {book_details['edition']}</Text>
              <Text style = {styles.writer}>Uploaded by: {book_details['username']}</Text>    
              <Text>Phone Number: {this.state.user}</Text>        
              <Text>NRS: {book_details['price']}</Text>
              
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const StoreWrapper=(props)=>{
  return <StoreContext.Consumer>
      {(storeData)=>{
        return <BookInfo {...props} storeData={storeData}/>
      }}
  </StoreContext.Consumer>
}

export default StoreWrapper

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  details: {
    flex: 1,
    marginTop: 10,
    flexDirection:'row',
  },
  list: {
    paddingHorizontal: 15,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: 'center'
  },
  card: {
    shadowColor: '#00000021',
    width: 250,
    height:250,

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor: "white",
    flexBasis: '42%',
    marginHorizontal: 10,
    marginTop: 30,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 200,
    width: 150,
   
  },
  title: {
    fontSize: 22,
    flex: 1,
    color: "#696969",
  },
  navigationOptions: {

    paddingTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"

  },
  buttonContainer: {
    height: 35,
    alignItems: 'center',
    borderWidth: 1,
    width: 150,
    borderRadius: 5,
    borderColor: "#332373",
    marginTop: 30,
    
  },
  addBookButton: {
    backgroundColor: "#332373",
  },
  addBookText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: "#332373",
  },
  loginupText:{
    color: '#fff',
    fontSize:18,
    fontWeight:'500',
  },
  leftContent:{  
    marginLeft:5,
    marginRight:5,
  },
  description:{
    height:50,
    width:150,
    marginRight:10,
    paddingVertical:6,
  },
  writer:{
    fontSize:12,
    color : '#A0A3A9'
  },
});    