import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';



class Contactus extends Component {

    static navigationOptions = {
        title: 'Contact',
    };


    render() {

                const address=(<Text style={{margin: 10}}>
                121, Clear Water Bay Road{"\n"}Clear Water Bay, Kowloon{"\n"}HONG
                KONG{"\n"}Tel: +852 1234 5678{"\n"}Fax: +852 8765 4321{"\n"}Email
                :confusion@food.net</Text>);
        
        return(
            
                <Card
                    title="OUR ADDRESS"
                  >
                {address}
                </Card>
         
        );
    }
}


export default Contactus;