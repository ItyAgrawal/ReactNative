import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';

import Dishdetail from './DishdetailComponent';

import { View, Platform, Text, ScrollView, Image, StyleSheet , ToastAndroid} from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements';
import Contactus from './ContactusComponent.js';
import Aboutus from './AboutusComponent.js';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
//import NetInfo from "@react-native-community/netinfo";



//automatically gets prop navigation


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

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

   const LoginNavigator = createStackNavigator({
      Login: { screen: Login }
    }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }} 
        onPress={ () => navigation.toggleDrawer() } />    
    })
  });
  


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

  const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation,
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

   const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites,
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
   Login: 
  { screen: LoginNavigator,
    navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='sign-in'
          type='font-awesome'            
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
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


    Favorites:
        { screen: FavoritesNavigator,
          navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='heart'
                type='font-awesome'            
                size={24}
                iconStyle={{ color: tintColor }}
              />
            ),
          }
        },

      Reservation:
      { screen: ReservationNavigator,
        navigationOptions: {
          title: 'Reserve Table',
          drawerLabel: 'Reserve Table',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='cutlery'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }
      }
}, {
    initialRouteName: 'Home',
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

    componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    //  NetInfo.getConnectionInfo()
    //     .then((connectionInfo) => {
    //         ToastAndroid.show('Initial Network Connectivity Type: '
    //             + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
    //             ToastAndroid.LONG)
    //     });

    // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }
  //toast will dispay for long duration
  //we have added an event listener which calls the event handler every time the connectivity changes
  
//   componentWillUnmount() {
//     NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
//   }
// //when we exit this component we dont want even listener to work further
//   handleConnectivityChange = (connectionInfo) => {
//     switch (connectionInfo.type) {
//       case 'none':
//         ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
//         break;
//       case 'wifi':
//         ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
//         break;
//       case 'cellular':
//         ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
//         break;
//       case 'unknown':
//         ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
//         break;
//       default:
//         break;
//     }
//   }


  render() {
 
    return (
       <View style={{flex:1}}>
            <MainNavigator />
        </View>
    );
  }
}
//flex:1 means last Component will take all the available space  <View style={{flex:1}}>
 //<View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}> 
export default connect(mapStateToProps, mapDispatchToProps)(Main);

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