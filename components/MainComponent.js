import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';

import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements';
import Contactus from './ContactusComponent.js';
import Aboutus from './AboutusComponent.js';

   const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu },
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
    );


    const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    })
});
   //this is  create just to give that header 

  const ContactusNavigator = createStackNavigator({
    Contactus: { screen: Contactus }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    })
});

  const AboutusNavigator = createStackNavigator({
    Aboutus: { screen: Aboutus }
      }, {
        navigationOptions: ({ navigation }) => ({
          headerStyle: {
              backgroundColor: "#512DA8"
          },
          headerTitleStyle: {
              color: "#fff"            
          },
          headerTintColor: "#fff"  
        })
});

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home'
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu'
        }, 
      },
    Contactus:
    {
      screen: ContactusNavigator,
      navigationOptions: {
          title: 'Contactus',
          drawerLabel: 'Contact Us'
        }, 

    },
      Aboutus:
    {
      screen: AboutusNavigator,
      navigationOptions: {
          title: 'Aboutus',
          drawerLabel: 'About Us'
        }, 

    },


}, {
  drawerBackgroundColor: '#D1C4E9'
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
      this.setState({selectedDish: dishId})
  }


  render() {
 
    return (
       
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MainNavigator />
        </View>
    );
  }
}
//flex:1 means last Component will take all the available space  <View style={{flex:1}}>
  
export default Main;