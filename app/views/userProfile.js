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
import { Container, Header, Content, Tab, Tabs } from 'native-base';

import Tab1 from './userUploads';
import Tab2 from './userSold';
import Tab3 from './userBought';

export default class Tabbs extends Component {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.mainContainer}>
                    <View style={styles.inContainer}>
                        <Image style={styles.profileImage} source={require("../icons/logout.png")} />
                    </View>
                </View>
                    <Container>
                        <Header hasTabs />
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
        flex: 1,
    },
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    inContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomWidth: 1,
        width: 300,
        height: 100,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#000'
    },
    profileImage: {
        width: 50,
        height: 50,
        marginLeft: 5,
        justifyContent: 'center',
        borderRadius: 50,
    },

});
