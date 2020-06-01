import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {

     constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

   static navigationOptions = {
        title: 'Menu'
    };



    render(){
      

    const { navigate } = this.props.navigation;

    const renderMenuItem = ({item, index}) => {

        return (
               <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                       onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    leftAvatar={{ source: require('./images/uthappizza.png')}}
                  />
        );
    };

    return (
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
}
}

//here in flastlist data should be an array
//renderItem contains list item which have access to individual item of array and keyextractor id which is 
//string
//hidechevron is arrow on ios so not to show it
//leftAvatar takes image javascript object as parameter  


export default Menu;