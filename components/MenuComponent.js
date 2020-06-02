import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem ,Tile} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }


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
               <Tile
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    imageSrc={{ uri:baseUrl+item.image}}
                  />
        );
    };

    return (
            <FlatList 
                data={this.props.dishes.dishes}
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



export default connect(mapStateToProps)(Menu);