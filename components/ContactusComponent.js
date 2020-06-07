import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Button ,Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contactus extends Component {

    static navigationOptions = {
        title: 'Contact',
    };



    sendMail() {
        MailComposer.composeAsync({
            recipients: ['agrawal@gmaail.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }
    

    render() {

                const address=(<Text style={{margin: 10}}>
                121, Clear Water Bay Road{"\n"}Clear Water Bay, Kowloon{"\n"}HONG
                KONG{"\n"}Tel: +852 1234 5678{"\n"}Fax: +852 8765 4321{"\n"}Email
                :confusion@food.net</Text>);
        
        return(

            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>                
                <Card title='Contact Information'>
                         {address} 
                <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={()=>{this.sendMail()}}
                        />
                </Card>
            </Animatable.View>
            
         
        );
    }
}


export default Contactus;