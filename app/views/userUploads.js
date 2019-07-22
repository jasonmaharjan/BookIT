import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  AsyncStorage,
} from 'react-native';
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
  Row,
} from 'native-base';
import { getUploadBooks, soldBook,removeBook } from '../api/api';
import StoreContext from '../Store/StoreContext';



class Tab1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [],
      username: "",
    };
  }

  componentWillMount(){
    this._loadUsername();
  }

  _loadUsername = async () => {
    var value = await AsyncStorage.getItem('username');
    this.setState({username: value});
    this.props.storeData.getUploadBookData();
  }



  clickEventListener(book_details) {
    this.props.navigation.navigate('book_info', { book_details: book_details});
  }

  async removeAndSellBook(item) {
  
    // To store in books_solds
    try {
      let res1=await soldBook({
        ISBN: item["ISBN"],
        title: item["title"],
        author: item["author"],
        price: item["price"],
        edition: item["edition"],
        category: item["category"],
        username: this.state.username,
        description: item["description"],
        image_URL: item["image_URL"],
        book_ID:item["book_ID"]
    })

      let res2= await removeBook(item["book_ID"])

      this.props.storeData.getUploadBookData()
      this.props.storeData.getAllBookData()
      this.props.storeData.getSoldBookData()
      
    }
    catch (errors) {
      console.log('catch errors :' + errors);
      alert("Some Error!")
    }

    // To remove the book from uploads
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.props.storeData.uploadBookData}
          keyExtractor={(item) => {
            return item.title;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.card}>
                <Image style={styles.image} source={{ uri: item.image_URL }} />
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                  <View style={styles.buttonWrapper}>
                    <Button transparent onPress={() => this.clickEventListener(item)}>
                      <Icon name="edit" type="FontAwesome" />
                    </Button>
                    <Button transparent onPress={() => this.removeAndSellBook(item)}>
                      <Icon name="remove" type="FontAwesome" />
                    </Button>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }} />
      </View>
    );
  }
}

export default class StoreWrapper extends React.Component{

  render(){
    return (
      <StoreContext.Consumer>
        {(storeData)=>{
          return <Tab1 {...this.props} storeData={storeData} />
        }}
        
      </StoreContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7"
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

    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 20,
  },

  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  price: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: "#6666ff"
  },
  buttonWrapper: {
    flexDirection: 'row'
  }
});