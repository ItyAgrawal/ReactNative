import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';

import Dishdetail from './DishdetailComponent';

import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements';
import Contactus from './ContactusComponent.js';
import Aboutus from './AboutusComponent.js';

//automatically gets prop navigation
   const MenuNavigator = createStackNavigator({
     Menu: { screen: Menu,
            navigationOptions: ({ navigation }) => ({
              headerLeft: <Icon name="menu" size={24} 
              color= 'white'
              onPress={ () => navigation.toggleDrawer() } />          
            })  
        },
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
    Home: { screen: Home,
    navigationOptions: ({ navigation }) => ({
              headerLeft: <Icon name="menu" size={24} 
              color= 'white'
              onPress={ () => navigation.toggleDrawer() } />          
            })}
  },
  {
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
//for individual screen we have navigation options
//and for whole stack navigator components also
  const ContactusNavigator = createStackNavigator({
    Contactus: { screen: Contactus,navigationOptions: ({ navigation }) => ({
              headerLeft: <Icon name="menu" size={24} 
              color= 'white'
              onPress={ () => navigation.toggleDrawer() } />          
            })   },

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
    Aboutus: { screen: Aboutus,
    navigationOptions: ({ navigation }) => ({
              headerLeft: <Icon name="menu" size={24} 
              color= 'white'
              onPress={ () => navigation.toggleDrawer() } />          
            })   }
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




  const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );

  //safearea is related to ios
  //drawer items by default is available which takes
  //all comepoents as props to display in side
  //whatever we write above it inside view will appear 
  //on side like logo







const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
          />
          ),
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
            drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }, 
      },
    Contactus:
    {
      screen: ContactusNavigator,
      navigationOptions: {
          title: 'Contactus',
          drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }, 

    },
      Aboutus:
    {
      screen: AboutusNavigator,
      navigationOptions: {
          title: 'Aboutus',
          drawerLabel: 'About Us',
            drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }, 

    },


}, {
drawerBackgroundColor: '#D1C4E9',
contentComponent: CustomDrawerContentComponent
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});