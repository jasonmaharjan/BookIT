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
    AsyncStorage,
    BackHandler,
    TextInput,



} from 'react-native';

import { Constants } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Tabs, Footer, FooterTab, } from 'native-base';
import ActionButton from 'react-native-action-button';

import withBadge from '../components/badge';

const BadgedIcon = withBadge(1)(Icon);
import {getBooks} from "../api/api"
import StoreContext from '../Store/StoreContext';
import { searchBooks } from '../api/api';

class Home extends React.Component {
  
    constructor(props) {
      super(props);
      this._backPressed = this._backPressed.bind(this);
      this.state = {
        data: [],
        username: "",
      };
    }
     

    componentDidMount(){
      this.props.storeData.getAllBookData();
      this._loadUsername();
      // BackHandler.addEventListener('hardwareBackPress', this._backPressed);
    }

    _loadUsername = async () => {
      var value = await AsyncStorage.getItem('username');
      this.setState({username: value}); 
    }

    _backPressed() {
    }

    async onSearchPressed() {
      try {
        let res = await searchBooks(this.state.search)
  
        if (res.data.success === false) {
          alert('No Book Found in database');
        }
  
        else {
          this.props.navigation.navigate('search', { search_results: res.data });
        }
      }
  
      catch (errors) {
        console.log('catch errors :' + errors);
      }
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
      this.props.navigation.navigate('book_info',{ book_details: book_details});
    }

    profileView() {
      this.props.navigation.navigate('userProfile');
    }
  
    render() {

      //console.log(this.props.storeData)
      return (
        <View style={styles.container}>
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

            <TouchableHighlight style={{borderRadius: 30}} onPress={() => this.onSearchPressed()}>
              <Icon name="search" style={styles.searchBar} />
            </TouchableHighlight>

          </View>
        </View>

        <View><Text style={{textAlign:"center", marginTop: 10}}>Available Books:</Text></View>
              
          <FlatList 
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.props.storeData.allBookData}
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
                    
                    <View style={styles.cardHeader}>
                      <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Image style={styles.cardImage} source={{uri:item.image_URL}}/>
                        <Text style={styles.title}>{item.text}</Text>
                      </View>
                    </View>
                </TouchableOpacity>
              )
            }}/>
            
            <Container>

      <Container>
        <Content/>
          </Container>

      </Container>
        </View>
      );
    }
  }


  class StoreWrapper extends React.Component{

    static navigationOptions = {
      header: null
    }

    render(){
      return (
        <StoreContext.Consumer>
          {(storeData)=>{
            return <Home {...this.props} storeData={storeData} />
          }}
          
        </StoreContext.Consumer>
      )
    }
  }

  export default StoreWrapper

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
    header: {
      marginLeft: 10,
      color: '#0956a4'
    },
    container:{
      flex:1,
    },
    searchBar: {
      fontSize: 30,
      borderRadius: 60,
    },
    text:{
      color: '#D3D3D3'
    },
    tabnav:{
      height:40,
      flex:1,
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
      marginTop: 25,
      paddingHorizontal: 10,
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
      backgroundColor:"#C0C0C0",
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
      width: 120,
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
    mainConatiner: {
      marginTop: 80,
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
  });    