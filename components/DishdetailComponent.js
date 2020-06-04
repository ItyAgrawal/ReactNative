import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button,TextInput, Alert, PanResponder } from 'react-native';
import { Card, Icon , Rating} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite , postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites:state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) =>dispatch(postComment(dishId, rating, author, comment))
})



function RenderDish(props) {

    const dish = props.dish;



    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    //if right to left swipe of 200 px then ecaluate true 

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

            return true;
        }
    })

    //event e and gesture state default para available
    //alert first para title,message,buttons,otheroptions
    
        if (dish != null) {
            return(
        <Animatable.View animation="fadeInDown"
         duration={2000} delay={1000}  {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{uri:baseUrl+dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flex:1,justifyContent:'center',flexDirection:'row'}}>
                    
                     <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    
                    

                     <Icon
                    reverse
                    raised
                    name={'pencil'}
                    type='font-awesome'
                    color='#512DA8'
                    onPress={() =>{props.toggleModal()}}
                    />
                    
                    </View>

                    <View style = {styles.modal}>

                    <Modal animationType = {"slide"} transparent = {false}
                    visible = {props.showModal}
                    onDismiss = {() => props.toggleModal() }
                    onRequestClose = {() => props.toggleModal() }>

                    <View>
                     <Rating
                        showRating
                        type="star"
                        ratingCount={5}
                        startingValue={1}
                        onFinishRating={(rating)=>props.ratingCompleted(rating)}
                        style={{ paddingVertical: 10 }}
                    />
                    <View style={{margin:10,flex:1,flexDirection:'row'}}>
                    <Icon
                    name={'user'}
                    type='font-awesome' style={styles.Icon}/>
                    <TextInput style={styles.textInput} onChangeText={(text) => props.onChangeAuthorText(text)}
                        placeholder="author" value={props.author}/>
                    </View>
                    <View style={{margin:10,flex:1,flexDirection:'row'}}>
                     <Icon
                    name={'comment'}
                    type='font-awesome' style={styles.Icon}/>
                      <TextInput style={styles.textInput} onChangeText={(comment) => props.onChangeCommentText(comment)}
                        placeholder="comment" value={props.comment}/>
                    </View>
                    <View style={styles.formRow}>
                     <Button
                            onPress = {() =>{props.toggleModal();props.addComment();props.resetForm();}}
                            color="#512DA8"
                            title="Submit" 
                        />
                    </View>


                        <View style={styles.formRow}>
                        <Button
                            onPress = {() =>{props.toggleModal();props.resetForm()}}
                            color="gray"
                            title="Close" 
                        />
                        </View>

                    </View>

                    </Modal>
                        
                        
                    </View>
                   
                

                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}




function RenderComments(props) {

    const comments = props.comments;

    if(comments!=null){
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

        return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>      
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
         </Animatable.View>
    );
    }
    else{
         return(<View></View>);
    }
}


class Dishdetail extends Component {

     constructor(props) {
        super(props);

        this.state = {
            rating: 1,
            author: '',
            comment: '',
            showModal:false
        }
    }
 
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'

    };

    addComment(dishId){
        this.props.postComment(dishId,this.state.rating,this.state.author,this.state.comment);
    }

    toggleModal()
    {
        this.setState({
            showModal:!this.state.showModal
        });
    }

    ratingCompleted(rating)
    {
        this.setState({
            rating:rating
        })
    }

      onChangeAuthorText(value)
    {
        this.setState({
            author:value

        });
    }

     onChangeCommentText(value)
    {
        this.setState({
            comment:value

        });
    }

      resetForm() {
        this.setState({
           rating: 1,
            author: '',
            comment: '',
            showModal:false
        });
    }



    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
        <ScrollView>
             <RenderDish dish={this.props.dishes.dishes[dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    addComment={()=>this.addComment(dishId)}
                    showModal={this.state.showModal}
                    toggleModal={()=>this.toggleModal()}
                    ratingCompleted={(rating)=>{this.ratingCompleted(rating);}}
                    onChangeAuthorText={(value)=>this.onChangeAuthorText(value)}
                    onChangeCommentText={(value)=>this.onChangeCommentText(value)}
                    author={this.state.author}
                    comment={this.state.comment}
                    resetForm={()=>{this.resetForm()}}
                 
                    />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/>
        </ScrollView>
        );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);


//https://fontawesome.com/v4.7.0/icons/#new for icons


const styles = StyleSheet.create({
    formRow: {
      justifyContent: 'center',
      margin:5
    },
    textInput:{

        flex:1
       
    },
    icon:{
        padding:10,
    }
    

});

