import React from "react"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from '../views/profile';
import CartScreen from '../views/cart';
import AddBookScreen from '../views/add_books';
import ProfileScreen from '../views/userProfile';

const bottomNav= createBottomTabNavigator(
  {
    Home: HomeScreen,
    Cart: CartScreen,
    AddBook:AddBookScreen,
    Profile:ProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Cart') {
          iconName = `ios-options`;
        }
        else if(routeName==="AddBook"){
          iconName="ios-book"
        }
        else if(routeName==="Profile"){
          iconName="ios-person"
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(bottomNav);