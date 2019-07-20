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
  ScrollView
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


export default class Tab3 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [        
        { id: 4, title: "Personal", image: "https://img.icons8.com/clouds/100/000000/employee-card.png", price: 154.573 },
        { id: 5, title: "For sale", image: "https://img.icons8.com/color/100/000000/land-sales.png", price: 124.678 },
      ]
    };
  }

  clickEventListener = (item) => {
    Alert.alert('Message', 'Item clicked. ' + item.title);
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
              <TouchableOpacity style={styles.card} onPress={() => { this.clickEventListener(item) }}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>{item.price}</Text>
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
    paddingBottom: 15,
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
});  