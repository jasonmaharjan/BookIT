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
        title: 'Bookit',
    };


export default class Home extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: [
          {id:1, title: "The Complete Novels", text:"Price: Rs 900" , image:"https://images-na.ssl-images-amazon.com/images/I/91k4D2PWq9L._AC_UL70_SR70,70_.jpg"},
          {id:2, title: "Advanced Engineering Mathematics", text:"Price: Rs 400", image:"https://images.textbooks.com/TextbookInfo/Thumb/0470458364_t.gif"} ,
          {id:3, title: "ANSI C", text:"Price: Rs 200", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxe7wENizTme3xrAxBy1fULT9VEI17I7PKSrgVQLOdV1qjl6i0XA"} ,
          {id:4, title: "The origin", text:"Price: Rs 250", image:"https://i5.walmartimages.com/asr/3f803607-b620-411d-bae1-99a4a7e2774a_1.0b1d0ca465122056ec7c106efed0418a.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF"} ,
          {id:5, title: "Hunger Games", text:"Price: Rs 300", image:"https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/product_image_aspect_switcher/public/product-images/csm-music/hungergamessoundtrack.jpg?itok=GO05_bED"} ,
          {id:6, title: "The Hate U Give", text:"Price: Rs 150", image:"http://www.goodbookfairy.com/wp-content/uploads/2018/03/The-Hate-U-Give-100x100.jpg"} ,
          {id:7, title: "The Idiot", text:"Price: Rs 180", image:"https://lh3.googleusercontent.com/CkehHtovJrbSnrUd10bK_YqHY-Npi7pPywG5mbWhpyr-3iClts1HmegXfosKKOtF8v8=s100-rw"},
          {id:8, title: "Angels & Demons", text:"Price: Rs 230", image:"https://m.media-amazon.com/images/M/MV5BMTY0NjYzNjIwNl5BMl5BanBnXkFtZTcwNjk0MDk1Mg@@._V1_UY100_UX100_AL_.jpg"} ,
        ]
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

            <TouchableHighlight style={[styles.buttonContainer, styles.addBookButton]} onPress={() => this.props.navigation.navigate('add_books')}>
                          <Text style={styles.addBookText}>Add Book</Text>
            </TouchableHighlight> 

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
    addBookButton: {
      backgroundColor: "green",
    },
    addBookText:{
      color: '#fff',
      fontSize:18,
      fontWeight:'500',
    },
  });    