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

import Tab1 from './userUploads';
import Tab2 from './userSold';
import Tab3 from './userBought';

export default class UserProfileTabs extends Component {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.mainContainer}>
                    <View style={styles.inContainer}>
                        <Image style={styles.profileImage} source={require("../icons/userProfile1.png")} />
                        <Text style={styles.username}> username </Text>
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
                            <Tab heading="Bought">
                                <Tab3 />
                            </Tab>
                        </Tabs>
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
