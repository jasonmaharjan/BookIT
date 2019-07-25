import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,

} from 'react-native';
import { Constants } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class CategoryScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          data: [
            {id:1, title: "Mathematics", image:"https://images-na.ssl-images-amazon.com/images/I/91k4D2PWq9L._AC_UL70_SR70,70_.jpg"},
            {id:2, title: "Physics", image:"https://images.textbooks.com/TextbookInfo/Thumb/0470458364_t.gif"} ,
            {id:3, title: "Chemistry", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxe7wENizTme3xrAxBy1fULT9VEI17I7PKSrgVQLOdV1qjl6i0XA"} ,
            {id:4, title: "English", image:"https://i5.walmartimages.com/asr/3f803607-b620-411d-bae1-99a4a7e2774a_1.0b1d0ca465122056ec7c106efed0418a.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF"} ,
            {id:5, title: "Computer", image:"https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/product_image_aspect_switcher/public/product-images/csm-music/hungergamessoundtrack.jpg?itok=GO05_bED"} ,
            {id:6, title: "Programming", image:"http://www.goodbookfairy.com/wp-content/uploads/2018/03/The-Hate-U-Give-100x100.jpg"} ,
          ]
        };
    }


    async clickEventListener(category) {
      try {
        let response = await fetch(`http://192.168.100.3:3000/category/${category}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              category: this.state.category
          })
        }) 
  
        let res = await response.json(); 
  
        if (res.success === false){
          alert('No Book of this category found in database');
        }

        //console.log(res);
        
        // Why is this navigation working here??

        this.props.navigation.navigate("category_results", {category_results: res});
          
      }
        
      catch(errors){
          //console.log('catch errors :' + errors);
      }
    }


  render() {
    return (
        <Container>
        
          <Header style={statusbarStyle.statusBar}>
            <Left>
              <Button transparent>
                <Icon name='menu' onPress={()=>{this.props.navigation.openDrawer()}} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>Category</Title>
            </Body>
          </Header>

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
                    <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item.title)}}>
                    <View style={styles.cardFooter}>
                        <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.title}>{item.title}</Text>
                      </View>
                      </View>
                    <Image style={styles.cardImage} source={{uri:item.image_URL}}/>
                    <View style={styles.cardHeader}>
                      <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.title}>{item.text}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
            }}/>
      </Container>
    );
  }
}

const statusbarStyle = StyleSheet.create({
    statusBar: {
      paddingTop: Constants.statusBarHeight,
      height:65,
    },
  });

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#F5F7F6',
    flex:1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  title:{
    color:'#0956a4'
  },
  signupText: {
    fontSize:20,    
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
    color:"#696969",
    justifyContent:'center',
  },
});