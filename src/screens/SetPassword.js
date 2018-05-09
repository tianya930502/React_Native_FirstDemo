import React,{Component} from 'react';
import {
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import PasswordGesture from 'react-native-gesture-password';

var Password1 = '';
class SetPassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: '请设置您的密码.',
            status: 'normal',
        }
    }
    onEnd(password) {
        if ( Password1 === '' ) {
            // The first password
            Password1 = password;
            this.setState({
                status: 'normal',
                message: '请再次输入您的密码.'
            });
        } else {
            // The second password
            if ( password === Password1 ) {
                this.setState({
                    status: 'right',
                    message: '您的密码设置成功'
                });
                AsyncStorage.setItem('GesturePassword', password);
                this.props.navigation.navigate('PasswordLogin');
                Password1 = '';
                // your codes to close this view
            } else {
                this.setState({
                    status: 'wrong',
                    message:  'Not the same, try again.'
                });
            }
        }
    }
    onStart() {
        if ( Password1 === '') {
            this.setState({
                message: '请设置您的密码.'
            });
        } else {
            this.setState({
                message: '请再次输入您的密码.'
            });
        }
    }
    render(){
        return(
            <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={this.onStart.bind(this)}
                onEnd={this.onEnd.bind(this)}
            />
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

export default SetPassword;
