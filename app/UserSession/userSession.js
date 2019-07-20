import {AsyncStorage} from "react-native"

export const isUserLoggedIn=async()=>{
  var username = await AsyncStorage.getItem('username');
  var token = await AsyncStorage.getItem('token');

  if(username && token){
    return {username,token}
  }
  else{
    return false
  }
}

export const setUser=(username,token)=>{
   AsyncStorage.setItem('username',username);
   AsyncStorage.setItem('token',token);

   return true ;
}

export const logoutUser=()=>{
  AsyncStorage.removeItem("username")
  AsyncStorage.removeItem("token")
}