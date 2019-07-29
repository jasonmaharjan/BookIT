import React,{Component} from 'react';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";

import DrawerNavigator from './app/components/drawerNavigator';
import UserProfileTabs from './app/views/userProfile';
import {isUserLoggedIn,setUser,logoutUser} from "./app/UserSession/userSession.js"
import AuthStackNav from "./app/components/AuthStack.js"
import StoreContext from './app/Store/StoreContext';
import { getBooks ,getUploadBooks,getSoldBook} from './app/api/api';
import { submitOrder } from './app/api/api';

export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = { loading: true,sameItem:false,isUserLoggedIn:false,allBookData:[],uploadBookData:[],soldBookData:[],cart:[]};
      }
    
      async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });

        let userData=await isUserLoggedIn()

        if(userData){
          this.setState({isUserLoggedIn:true,userData})
          //console.log(userData)
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
       // console.log("///",this.state.userData.username)
        
        getUploadBooks(this.state.userData.username).then((res)=>{
          
          this.setState({uploadBookData:res.data})
        }).catch(err=>{
          console.log(err)
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
      //cart business logic

        /**
        * {
        *  bookId:1,
        *  book_details:,
        *  count:2,
        * } 
        * */

      addToCart = (cartItem)=>{
        // const oldCartCopy = Object.assign([], this.state.cart);
        // oldCartCopy.push(cartItem);
        // console.log(['new cart item added to cart', oldCartCopy])
        // this.setState({cart : oldCartCopy});
        if(this.state.isUserLoggedIn){
 
          const newCart = [...this.state.cart,cartItem]
            this.setState({
              cart:newCart
            })
            alert('Book added to the cart');
        }
      
        else{
          alert("Please log in ");
        }
      }


      addItemCount=(bookId, book_details,value=1)=>{

        if(this.state.isUserLoggedIn){

          let newCart = [...this.state.cart];
          let newEntryToCart = true;
          newCart.forEach((item, index)=>{
            if(item.bookId == bookId){
              item.count+=value;
              newEntryToCart = false;
            }
          })
          //console.log({runAddToCart, bookId, newCart});
          if(newEntryToCart){
            newCart.push({bookId,book_details,count:1});
            this.setState({
              asdas:'dasdasd',
              cart:newCart
            })
            alert("Added book in the cart");
            
          }else{
            this.setState({cart:newCart});
            alert("Added same book again in the cart");
          }
      }

      else{
        alert('Please login in to add to cart');
      }
    }

      deleteItem=(bookId)=>{
        let cartInState = [...this.state.cart];

        cartInState.forEach((item,index)=>{
          if(item.bookId === bookId){
            if (cartInState[index].count > 0){
              cartInState[index].count--;
            }
            else{
              alert('Item already removed from Cart');
            }
          }
        })

        //console.log(cartInState);
        this.setState({
          cart:cartInState
        })
        //console.log(this.state.cart);
      }

      deleteFromCount=(cartItem)=>{
      const cart = [...this.state.cart];
      let newCart = []
      for(items in cart){
        if(items.bookId !== cartItem.bookId){
          newCart.push(items);
        }
      }
      this.setState({cart:newCart});
      }




      // Send cart data before submitting order
      sendCartData =(username, location)=> {

        let cartInState = [...this.state.cart];
       /*
        cartInState.forEach((item,index)=>{
          if(item.bookId === bookId){
            if (cartInState[index].count === 0){
              alert('Book is already removed from cart');
            }
            else{
              this.onSubmit(username, item.bookId, cartInState[index].count, location);
              alert('Thank you for submitting your order! You will be notified soon.');
            }             
          }
        })*/
        
        this.onSubmit(username, this.state.cart, location);

        alert('Thank you for submitting your order! You will be notified soon.');

      }   

      onSubmit =async(username, cart, location) => {
        try {
          let res = await submitOrder({username: username, cart: cart, location:location})
          console.log(res.data);
        }
    
        catch (errors) {
          //console.log('catch errors :' + errors);
        }
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
                soldBookData:this.state.soldBookData,
                cart: this.state.cart,
                addToCart:this.addToCart,
                deleteItem:this.deleteItem,
                addItemCount: this.addItemCount,
                deleteFromCount: this.deleteFromCount,
                sameItem: this.state.sameItem,
                sendCartData: this.sendCartData,
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
