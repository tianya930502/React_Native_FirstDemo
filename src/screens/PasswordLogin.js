import React,{Component} from 'react';
import {
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import PasswordGesture from 'react-native-gesture-password';

class PasswordLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            GesturePassword: '',
            message: '请输入您的密码进行登录.',
            status: 'normal',
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('GesturePassword').then(value => {
                console.log(value);
                this.setState({
                    GesturePassword: value,
                })
            }
        );
    }
    onEnd(password) {
        if (password == this.state.GesturePassword) {
            this.setState({
                status: 'right',
                message: '密码正确.'
            });
            // your codes to close this view
            this.props.navigation.navigate('Main')
        } else {
            this.setState({
                status: 'wrong',
                message: '密码错误，请再次尝试.'
            });
        }
    }
    onStart() {
        this.setState({
            status: 'normal',
            message: '请输入您的密码进行登录.'
        });
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

export default PasswordLogin;
