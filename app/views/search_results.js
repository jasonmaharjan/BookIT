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
      this.props.navigation.navigate('book_info',{ book_details: item});
    }

    render() {
      var search_results = this.props.navigation.state.params.search_results;

      return (
        
         <View style={styles.container}>
          <View >
              <NavigationBar
                title={titleConfig}
          />  
          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data= {search_results}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            numColumns={2}
            keyExtractor= {(item) => {
              return item;
            }}
            renderItem={({item}) => {
              return (
                  <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
                 <View style = {styles.searchContainer} >
                    <Image style={styles.cardImage} source={{uri:item.image_URL}}/>
                    <View style={styles.cardFooter}>
                        <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.title}>{item.title} ({item.edition})th Edition</Text>
                        <Text style = {styles.writer}> by {item.author}</Text>
                      </View>
                      </View>
                    <View style={styles.cardHeader}>
                      <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.title}>NRs: {item.price}</Text>
                      </View>
                    </View>
                    </View>
                </TouchableOpacity>
              )
            }}/>
        </View> 

          
          </View> 
          
          
      );
    }
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent:'center',
    alignItems:'center',    
  },
  searchContainer:{
    flexDirection:'column',
    borderColor:'#000',
    borderWidth:1,
  },
  details: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 15,
    //backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: 'center'
  },
  card: {
    shadowColor: '#00000021',
    paddingVertical:10,

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor: "white",
    flexBasis: '42%',
    marginHorizontal: 10,
    marginTop: 30,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 200,
    width: 250,
    alignSelf: 'center'
  },
  title: {
    fontSize: 15,
    flex: 1,
    alignSelf: 'center',
    color: "#696969"
  },
  writer:{
    fontSize:12,
    color : '#A0A3A9'
  },
  navigationOptions: {

    paddingTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"

  },
  buttonContainer: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    width: 250,
    borderRadius: 5,
    borderColor: "#332373",
    marginTop: 20,
    marginBottom: 20,
  },
  addBookButton: {
    backgroundColor: "#332373",
  },
  addBookText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    width:250,
    borderRadius:5,    
    borderColor: "#332373",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#332373",
  },
  loginupText:{
    color: '#fff',
    fontSize:18,
    fontWeight:'500',
  },
});    