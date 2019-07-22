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
  } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Button } from 'native-base';
import Tab1 from './userUploads';
import Tab2 from './userSold';
import Tab3 from './userBought';
import StoreContext from '../Store/StoreContext';


class UserProfileTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
          username: "",
        };
      }

    componentWillMount(){
        this._loadUsername();
      }
    
      _loadUsername = async () => {
        var value = await AsyncStorage.getItem('username');
        this.setState({username: value});

      }

      logout(){
        this.props.storeData.logout()
      }
    
 

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.mainContainer}>
                    <View style={styles.inContainer}>
                        <Image style={styles.profileImage} source={require("../icons/userprofile.png")} />
                        <Text style={styles.username}> {this.state.username} </Text>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Button info rounded style={{width:90,alignItems:"center",justifyContent:"center"}}onPress = {() =>{this.logout()}}>
                                <Text style={{color:"white"}}>Logout</Text>
                            </Button>
                        </View>
                    </View>
                </View>
                    <Container >
                        <Header style={styles.tabnav} hasTabs />
                        <Tabs>
                            <Tab heading="Uploads">
                                <Tab1 />
                            </Tab>
                            <Tab heading="Sold">
                                <Tab2 />
                            </Tab>
                        </Tabs>
                    </Container>

            </View>
        );
    }
}

const StoreWrapper=(props)=>{
    return <StoreContext.Consumer>
        {(storeData)=>{
          return <UserProfileTabs {...props} storeData={storeData}/>
        }}
    </StoreContext.Consumer>
}
  
export default StoreWrapper

const styles = StyleSheet.create({
    container: {
        flex:1,   
    },
  
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 130,
    },
    logoutImage: {
        width: 50,
        height: 40,
        marginLeft: 75,
        marginTop: 15,
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth:2,
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
        color: '#000',
    },
    profileImage: {
        width: 70,
        height: 70,
        marginLeft: 10,
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
    }

});