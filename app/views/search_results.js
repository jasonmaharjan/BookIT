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
} from 'react-native';

import NavigationBar from 'react-native-navbar';

    const titleConfig = {
        title: 'You searched for',
    };


export default class Search extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    clickEventListener(item) {
      Alert.Alert(item.title)
    }
  
    render() {
      return (
        <View style={styles.container}>
            <View >
                <NavigationBar
                title={titleConfig}
            />

            </View>

          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                  <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item.view)}}>
                  <View style={styles.cardFooter}>
                      <View style={{alignItems:"center", justifyContent:"center"}}>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    </View>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
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
      height: 100,
      width: 100,
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
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth:1,
      width:250,
      borderRadius:5,    
      borderColor: "green",
      marginTop: 20,
    },
  });    