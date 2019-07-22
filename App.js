import React,{Component} from 'react';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";

import DrawerNavigator from './app/components/drawerNavigator';
import UserProfileTabs from './app/views/userProfile';
import {isUserLoggedIn,setUser,logoutUser} from "./app/UserSession/userSession.js"
import AuthStackNav from "./app/components/AuthStack.js"
import StoreContext from './app/Store/StoreContext';
import { getBooks ,getUploadBooks,getSoldBook} from './app/api/api';
export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = { loading: true,isUserLoggedIn:false,allBookData:[],uploadBookData:[],soldBookData:[]};
      }
    
      async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });

        let userData=await isUserLoggedIn()

        if(userData){
          this.setState({isUserLoggedIn:true,userData})
        }
        else{
          this.setState({isUserLoggedIn:false})
        }

        this.setState({ loading: false });
      }

      getAllBookData=()=>{
        getBooks().then((res)=>{
          this.setState({allBookData:res.data})
        }) 
      }

      getUploadBookData=()=>{
        console.log("///",this.state.userData.username)
        
        getUploadBooks(this.state.userData.username).then((res)=>{
          alert(this.state.userData.username,"asdasdasdasd")
          this.setState({uploadBookData:res.data})
        }).catch(err=>{
          console.log(err)
          alert("yooo dwag!")
        })

      }

      getSoldBookData=()=>{
        getSoldBook(this.state.userData.username).then((res)=>{
          this.setState({soldBookData:res.data})
        }) 
      }

      logout=()=>{
        logoutUser()
        this.setState({isUserLoggedIn:false})
      }

      setUserData=(username,token)=>{
        setUser(username,token)
        this.setState({isUserLoggedIn:true,userData:{username,token}})
      }

    render(){
        if (this.state.loading) {
            return (
              <Root>
                <AppLoading />
              </Root>
            );
          }
          return (
            <StoreContext.Provider 
              value={{
                isUserLoggedIn:this.state.isUserLoggedIn,
                logout:this.logout,
                setUserData:this.setUserData,
                allBookData:this.state.allBookData,
                getAllBookData:this.getAllBookData,
                getUploadBookData:this.getUploadBookData,
                getSoldBookData:this.getSoldBookData,
                uploadBookData:this.state.uploadBookData,
                soldBookData:this.state.soldBookData
              }}
            >
              <Root>
                {this.state.isUserLoggedIn && <DrawerNavigator/>}
                {!this.state.isUserLoggedIn && <AuthStackNav/>}
              </Root>
            </StoreContext.Provider>
          );
    }
}
