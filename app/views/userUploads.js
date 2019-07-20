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


export default class Tab1 extends Component {

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
    this.getData();
  }

  async getData() {
    try {
      let response = await fetch('http://192.168.100.3:3000/userbooks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({            
          username: this.state.username,
        })
      })

      let res = await response.json(); 

      this.setState({data: res});

        let errors = res;
        throw errors;
    }

    catch (errors) {
      console.log('catch errors :' + errors);
    }
  }  

  clickEventListener(book_details) {
    this.props.navigation.navigate('book_info', { book_details: book_details});
  }

  async removeBook(item) {
  
    // To store in books_solds
    try {
      let response = await fetch('http://192.168.100.3:3000/soldbooks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

            ISBN: item["ISBN"],
            title: item["title"],
            author: item["author"],
            price: item["price"],
            edition: item["edition"],
            category: item["category"],
            username: this.state.username,
            description: item["description"],
            image_URL: item["image_URL"],
          
        })
      })
    }
    catch (errors) {
      console.log('catch errors :' + errors);
    }


    // To remove the book from uploads
    try {
      let response = await fetch('http://192.168.100.3:3000/removebooks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

            ISBN: item["ISBN"],
            title: item["title"],
            author: item["author"],
            price: item["price"],
            edition: item["edition"],
            category: item["category"],
            username: this.state.username,
            description: item["description"],
            image_URL: item["image_URL"],
          
        })
      })

      let res = await response.json(); 

      alert(res.message);

      if (res.success === true) {
        alert('Book Removed');
        // refresh page
      }
    }

    catch (errors) {
      console.log('catch errors :' + errors);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.card}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                  <View style={styles.buttonWrapper}>
                    <Button transparent onPress={() => this.clickEventListener(item)}>
                      <Icon name="edit" type="FontAwesome" />
                    </Button>
                    <Button transparent onPress={() => this.removeBook(item)}>
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