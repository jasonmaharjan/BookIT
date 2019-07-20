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
import { Container, Header, Content, Tab, Tabs } from 'native-base';

export default class UserProfileTabs extends Component {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.mainContainer}>
                    <View style={styles.inContainer}>
                        
                        <Text style={styles.username}> Books added to cart: </Text>
                    </View>
                </View>
                    <Container >
                        
                    </Container>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,   
    },
  
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 130,
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
    }

});




