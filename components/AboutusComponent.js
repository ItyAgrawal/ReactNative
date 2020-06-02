import React, { Component } from 'react';
import { View, FlatList, Text, ScrollView } from 'react-native';
import { ListItem , Card} from 'react-native-elements';
import { LEADERS } from '../shared/leaders.js';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

class Aboutus extends Component {

     constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }

   static navigationOptions = {
        title: 'About Us'
    };



    render(){

    const renderLeaderItem = ({item, index}) => {

        return (
               <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source:{uri:baseUrl+item.image}}}
                  />
        );
    };

    const History=()=>{
        return(
        <Card title="Our History">
            <Text style={{margin:10}}>

           Started in 2010, Ristorante con Fusion quickly established itself as a culinary 
            icon par excellence in Hong Kong. With its unique brand of world fusion cuisine 
            that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong. 
            Featuring four of the best three-star Michelin chefs in the world, you never know what 
            will arrive on your plate the next time you visit us.
            The restaurant traces its humble beginnings to The Frying Pan,
            a successful chain started by our CEO, Mr. Peter Pan, 
            that featured for the first time the world best cuisines in a pan.
            </Text>
        </Card>
    );
    }

    const RenderLeaders =()=>{

        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
               
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
              
                    <Card
                        title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        else {
            return(
                  <Card title="Corporate LeaderShip">
                
                <FlatList style={{margin:1}}
                    data={this.props.leaders.leaders}
                    renderItem={renderLeaderItem}
                    keyExtractor={item => item.id.toString()}
                />
                 </Card>
            );
        }
    }

    return (
        <ScrollView style={{flex:1}}>
            <History/>
            
            <RenderLeaders/>
        </ScrollView>
    );
}
}



export default connect(mapStateToProps)(Aboutus);