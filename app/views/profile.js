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



} from 'react-native';

import { Constants } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Tabs, Footer, FooterTab, } from 'native-base';
import ActionButton from 'react-native-action-button';

import withBadge from '../components/badge';

const BadgedIcon = withBadge(1)(Icon);

export default class Home extends React.Component {
  
    constructor(props) {
      super(props);
      this._backPressed = this._backPressed.bind(this);
      this.state = {
        data: [],
        username: "",
      };
    }

    static navigationOptions = ({ screenProps }) => ({
      title: 'Book IT',
      headerTintColor: '#0956a4',
      headerLeft: (
        <Icon name='menu' onPress={() => screenProps.openDrawer()} style={styles.header} />
      ),
      headerRight:(
        <BadgedIcon
        name="cart" color="white" containerStyle={styles.padRight}
      />      
      ),
    })
    
  
    componentWillUnmount() {
      // this._backPressed();
      // BackHandler.exitApp();
      // BackHandler.removeEventListener('hardwareBackPress', this._backPressed);
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
    _backPressed() {
      // this.props.navigation.goBack(null);
      // return true; 
    //   if (this.state.username != null){
    //     this.props.navigation.navigate('profile');
    //   }
    //   BackHandler.removeEventListener('hardwareBackPress', this._backPressed);
    //   BackHandler.exitApp();
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
  
    render() {

      return (
        <View style={styles.container}>

              
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
            
            <View style={{flex:1, backgroundColor: '#f3f3f3'}}>        
              <ActionButton buttonColor="#0956a4">
                <ActionButton.Item buttonColor='#0956a4' title="Request book" onPress={() => console.log("notes tapped!")}>
                  <Icon name="md-" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#0956a4' title="My Cart"  onPress={() => console.log("notes tapped!")}>
                  <Icon name="md-cart" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#0956a4' title="Rent book"  onPress={() => {}}>
                  <Icon name="md-add" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#0956a4' title="Donate book" onPress={() => {}}>
                  <Icon name="md-" style={styles.actionButtonIcon} />
                </ActionButton.Item>
              </ActionButton>
            </View>

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
        </View>
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
    header: {
      marginLeft: 10,
      color: '#0956a4'
    },
    container:{
      flex:1,

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