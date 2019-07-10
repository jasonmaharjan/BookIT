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
    AsyncStorage
} from 'react-native';

import NavigationBar from 'react-native-navbar';

    const titleConfig = {
        title: 'Bookit',
    };

import Dialog, { DialogFooter,
  DialogButton, 
  SlideAnimation, 
  DialogContent, 
} from 'react-native-popup-dialog';

export default class Home extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }
    

    componentDidMount(){
      this.getData();
    }

    getData = () => {
      fetch('http://192.168.100.27:3000/allbooks')
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
      this.props.navigation.navigate('Home');
    }

    clickEventListener(book_details) {
      this.props.navigation.navigate('book_info', { book_details: book_details});
    }
  
    render() {

      return (
        <View style={styles.container}>
           <View >
              <NavigationBar
              title={titleConfig}
              />
            </View>
            <TouchableHighlight style={[styles.refreshContainer, styles.refreshButton]} onPress ={() => this.logout()}>
                <Image style={styles.icon} source={require("../icons/logout.png")} />
            </TouchableHighlight>

              <TouchableHighlight style={[styles.buttonContainer, styles.addBookButton]} onPress={() => this.props.navigation.navigate('add_books')}>
                            <Text style={styles.addBookText}>Add Book</Text>
                            
              </TouchableHighlight> 
              

          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}
            keyExtractor= {(item) => {
              return item.book_ID;
            }}
            renderItem={({item}) => {
              return (
                  <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
                  <View style={styles.cardFooter}>
                      <View style={{alignItems:"center", justifyContent:"center"}}>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    </View>
                  <Image style={styles.cardImage} source={{uri:item.image_URL}}/>
                  <View style={styles.cardHeader}>
                    <View style={{alignItems:"center", justifyContent:"center"}}>
                      <Text style={styles.title}>{item.text}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}/>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:10,
    },
    refreshContainer: {
      height:35,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderWidth:1,
      width:50,
      borderRadius:5,    
      borderColor: "#000000",
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 380, 
    },
    refreshButton: {
      backgroundColor: "#FFFFFF",

    },
    icon: {
      width:40,
      height:40,
    },  
    list: {
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
    navigationOptions: {
        
            paddingTop:15,
            fontSize: 18,
            fontWeight: "bold",
            color: "#fff"
    
    },
    buttonContainer: {
      height:35,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderWidth:1,
      width:250,
      borderRadius:5,    
      borderColor: "#332373",
      marginTop: 20,
      marginBottom: 20, 
    },
    addBookButton: {
      backgroundColor: "#332373",
    },
    addBookText:{
      color: '#fff',
      fontSize:18,
      fontWeight:'500',
    },
  });    