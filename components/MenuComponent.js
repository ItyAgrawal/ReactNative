import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem ,Tile} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }


class Menu extends Component {

   static navigationOptions = {
        title: 'Menu'

    };



    render(){
      

    const { navigate } = this.props.navigation;

    const renderMenuItem = ({item, index}) => {

        return (
             <Animatable.View animation="fadeInRightBig" duration={2000}>     
               <Tile
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    imageSrc={{ uri:baseUrl+item.image}}
                  />
            </Animatable.View>
        );
    };


        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
            <View>
                <FlatList 
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}/>
            </View>
                 
            );
        }
    }
    }

    

//here in flastlist data should be an array
//renderItem contains list item which have access to individual item of array and keyextractor id which is 
//string
//hidechevron is arrow on ios so not to show it
//leftAvatar takes image javascript object as parameter  



export default connect(mapStateToProps)(Menu);