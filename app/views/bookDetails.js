import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import NavigationBar from 'react-native-navbar';
import { ScrollView } from 'react-native-gesture-handler';

const titleConfig = {
    title: 'Bookit',
};


export default class bookDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    title: "The Origin",
                    ISBN: "123455432",
                    author: "Dan Brown",
                    price: "Rs 900",
                    edition: "First",
                    username: "username",
                    description: "description",
                    image: "https://target.scene7.com/is/image/Target/GUEST_18814236-8cdc-43b3-946a-6ba064b27eed?wid=250&hei=250&fmt=pjpeg",
                },
            ]
        };
    }

    render() {
    
        return (
            <ScrollView>

                <View style={styles.container}>

                    <View style={styles.mainConatiner}>

                        <FlatList style={styles.list}
                            contentContainerStyle={styles.listContainer}
                            data={this.state.data}
                            horizontal={false}
                            numColumns={1}
                            keyExtractor={(item) => {
                                return item.id;
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <View>

                                        <Image style={styles.photo}
                                            source={{ uri: item.image }} />
                                        <View style={styles.inConatiner}>
                                            <Text style={styles.inputs}>Title: {item.title}</Text>
                                        </View>
                                        <View style={styles.inConatiner}>
                                            <Text style={styles.inputs}>Price: {item.price}</Text>
                                        </View>
                                        <View style={styles.inConatiner}>
                                            <Text style={styles.inputs}>ISBN: {item.ISBN}</Text>
                                        </View>
                                        <View style={styles.inConatiner}>
                                            <Text style={styles.inputs}>Author: {item.author}</Text>
                                        </View>
                                        <View style={styles.inConatiner}>
                                            <Text style={styles.inputs}>Edition: {item.edition}</Text>
                                        </View>
                                        <View style={styles.inConatiner}>
                                            <Text style={styles.inputs}>Description: {item.description}</Text>
                                        </View>
                                        <View style={styles.inConatiner}>
                                            <Text style={styles.inputs}>Uploaded by: {item.username}</Text>
                                        </View>
                                    </View>
                                )
                            }} 
                      
                            />
                        <TouchableHighlight style={[styles.buttonContainer, styles.addBookButton]} onPress={() => { Alert.alert('Added to cart!');}}>
                            <Text style={styles.addBookText}>Add To Cart</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F7F6',
        flex: 1,
        marginTop: 20,
    },
    mainConatiner: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    inContainer: {
        borderBottomColor: '#A0A3A9',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#000',
        justifyContent: "center",
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
    },
    list: {
        paddingHorizontal: 15,
        backgroundColor:"#E6E6E6",
        width: 300,
    },
    listContainer:{
        alignItems:'center'
    },
    photo:{
        height: 300,
        width: 300,
        alignSelf:'center',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: 250,
        borderRadius: 5,
        borderColor: "green",
        marginTop: 20,
        marginBottom: 20,
    },
    addBookButton: {
        backgroundColor: "green",
    },
    addBookText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
});

