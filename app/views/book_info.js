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
  Button
} from 'react-native';

import NavigationBar from 'react-native-navbar';

const titleConfig = {
  title: 'BOOK DETAILS',
};

export default class BookInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cart:[],
    };
  }
  /**
  * {
  *  bookId:1,
  *  count:2,
  * } 
  * */

  addToCart = (cartItem)=>{
    cart = this.state.cart;
    this.setState({cart : cartItem});

    console.log('Added book to cart!')
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
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.addToCart(book_details)}>
              <Text style={styles.loginupText}>Add to cart</Text>
            </TouchableHighlight>

            <Text>ISBN: {book_details['ISBN']}</Text>
            <Text>Title: {book_details['title']}</Text>
            <Text>Author: {book_details['author']}</Text>
            <Text>Edition: {book_details['edition']}</Text>
            <Text>Price: {book_details['price']}</Text>
            <Text>Uploaded By: {book_details['username']}</Text>
            <TouchableOpacity style={styles.card}>
              <Image style={styles.cardImage} source={{ uri: image_URL }} />
            </TouchableOpacity>   

          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  details: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
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
    alignSelf: 'center'
  },
  title: {
    fontSize: 15,
    flex: 1,
    alignSelf: 'center',
    color: "#696969"
  },
  navigationOptions: {

    paddingTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"

  },
  buttonContainer: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    width: 250,
    borderRadius: 5,
    borderColor: "#332373",
    marginTop: 20,
    marginBottom: 20,
  },
  addBookButton: {
    backgroundColor: "#332373",
  },
  addBookText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    width:250,
    borderRadius:5,    
    borderColor: "#332373",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#332373",
  },
  loginupText:{
    color: '#fff',
    fontSize:18,
    fontWeight:'500',
  },
});    