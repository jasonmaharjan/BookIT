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
                        <Image style={styles.profileImage} source={require("../icons/logout.png")} />
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
        height: 120,
    },
    inContainer: {
        borderRadius: 10,
        width: 300,
        height: 100,
        marginBottom: 10,
        marginTop:10,
        flexDirection: 'row',
        color: '#000'
    },
    profileImage: {
        width: 50,
        height: 50,
        marginLeft: 5,
        justifyContent: 'center',
        borderRadius: 50,
    },
    tabnav:{
        height:40,
        flex:1,
    }

});
