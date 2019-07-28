import React, { Component } from 'react';
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
    FlatList,
  } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Button, Icon } from 'native-base';
import StoreContext from '../Store/StoreContext';
import { getAddress } from '../api/api';


 class Cart extends Component {
    state={
        quantity:1,
        username: "",
        location: null,
        errorMessage: null,

    }

    componentDidMount =() =>{
      this._loadUsername();

    }
    componentWillMount = async () =>{
      this.address();
    }

    
    onSubmitPressed =() =>{
      if(this.state.location){                                          
        //storeData.sendCartData(this.state.username,this.state.location);
        console.log(this.state.location);
      }else{
        alert("couldn't get your location.");
      }
    
    }     


    address=async()=> {

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position=async(position)=> {
              var lat = position.coords.latitude;
              var lng = position.coords.longitude;
              var res = await getAddress(lat,lng);
              if(res){
               this.setState({
                 location:res.data.features[0].place_name
               })
               console.log(this.state.location)

              }
          }, function(error) {
              console.log(error);

            });
        
      } else {
          // Fallback for no geolocation
          console.log("Turn on location");
      }
    }

    _loadUsername = async () => {
      var value = await AsyncStorage.getItem('username');
      console.log(this.state.username);
      this.setState({username: value}); 
    }

    updateItemCount=()=>{
      this.setState({
        quantity:this.state.quantity+1
      })
     return this.state.quantity;
    }


    render() {
    
        return (
            <View style={styles.container}>

                <View style={styles.mainContainer}>
                    <View style={styles.inContainer}>
                        <Text style={{textAlign:"center"}}> Books added to cart: </Text>
                    </View>
                </View>
                    <Container >
                      {this.props.storeData.cart.length!==0?  <View style={styles.container}>
                        <FlatList 
                            style={styles.list}
                            contentContainerStyle={styles.listContainer}
                            data={this.props.storeData.cart}
                            numColumns={1}
                            keyExtractor= {(item) => {
                            return item.bookId;
                            }}
                            renderItem={({item}) => {
                                
                            return (
                              <View>

                                <TouchableOpacity  style={styles.card}>
                                <View style={styles.cardFooter}>
                                    <View style={{alignItems:"center", justifyContent:"center"}}>
                                    <Text style={styles.title}>{item.book_details.title}</Text>
                                    </View>
                                    </View>
                                <Image style={styles.cardImage} source={{uri:item.book_details.image_URL}}/>
                                <View style={styles.cardHeader}>
                                    <View style={{alignItems:"center", justifyContent:"center"}}>
                                    <Text style={styles.title}>{item.book_details.title}</Text>
                                    </View>
                                    <Text>Quantity:{item.count}</Text>
                                </View>
                                <StoreContext.Consumer>
                                  {
                                    (storeData)=>{

                                      removefromCartlist = () =>{
                                        storeData.deleteItem(item.bookId);                                        
                                      }                       
                                      
                                      return(
                                        <View style={styles.buttonWrapper}>
                                          <Button transparent onPress={() => removefromCartlist()}>
                                            <Icon name="remove" type="FontAwesome" />
                                          </Button>
                                          
                                         </View>
                                        )
                                    }
                                  }
                                </StoreContext.Consumer>
                                </TouchableOpacity>
                                


                             </View>

                            )
                            }}/>
                            
                            <TouchableHighlight style={[styles.buttonContainer, styles.addBookButton]} onPress={()=> this.onSubmitPressed()}>
                                <Text style={styles.addBookText}>Submit</Text>
                            </TouchableHighlight>


                          </View>:
                          <View>
                            <Text style={{textAlign:"center"}}>No books in cart yet!</Text>
                          </View>
                        }
                    </Container>
            </View>
        );
    }
}

class StoreWrapper extends React.Component{

    render(){
      return (
        <StoreContext.Consumer>
          {(storeData)=>{
            return <Cart {...this.props} storeData={storeData} />
          }}
          
        </StoreContext.Consumer>
      )
    }
  }

  export default StoreWrapper;

const styles = StyleSheet.create({
    container: {
        flex:1,   
    },
    buttonWrapper: {
      flexDirection: 'row'
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
  
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 130,
        marginTop: 50
    },
    inContainer: {
        borderRadius: 10,
        width: 300,
        height: 100,
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        color: '#A9A9A9',
    },
    profileImage: {
        width: 70,
        height: 70,
        marginLeft: 15,
        marginTop: 15,
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth:2,
    },
    username: {
        padding: 30,
        fontWeight: '400',
        fontSize: 20,
    },
    tabnav:{
        height:40,
        flex:1,
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

});




