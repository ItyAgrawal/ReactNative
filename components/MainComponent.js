import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { View } from 'react-native';
import Dishdetail from './DishdetailComponent';

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
       <View>
            <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} />
            <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        </View>
    );
  }
}
//flex:1 means last Component will take all the available space  <View style={{flex:1}}>
  
export default Main;