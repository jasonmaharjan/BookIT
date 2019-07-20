import React,{Component} from 'react';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";
import {createSwitchNavigator,createAppContainer} from "react-navigation"
import DrawerNavigator from './app/components/drawerNavigator';
import UserProfileTabs from './app/views/userProfile';
import Login from './app/views/login';
import {isUserLoggedIn,logoutUser} from "./app/UserSession/userSession.js"



class AuthLoadingScreen extends Component{


  async componentWillMount() {
   
  }

  componentWillMount=async ()=>{

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });

    // logoutUser()
    
    let userdata=await isUserLoggedIn();

    if(userdata){
      this.props.navigation.navigate("App")
    }
    else{
      this.props.navigation.navigate("AuthStack")
    }
  }

  render(){
    return(
      <AppLoading />
    )
  }
}

const SwitchNav=createSwitchNavigator({
  AuthLoading:AuthLoadingScreen,
  AuthScreen:Login,
  App:DrawerNavigator
},{ 
  initialRouteName:"AuthLoading"
})

const SwitchScreens=createAppContainer(SwitchNav)

export default class App extends Component{

    constructor(props) {
        super(props);
    }

    render(){
       return (
       <Root>
         <SwitchScreens/>
       </Root>)
    }
}
