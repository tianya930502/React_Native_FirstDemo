import React,{Component} from 'react';

import {
    Button,
    View,
    Text,
    StyleSheet,
} from 'react-native';

class LoginScreen extends Component{
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{backgroundColor:'#fff',flex:1}}>
                <Text style={{padding:20}}>this is Login page</Text>
                <Button
                    onPress={() => navigate('AllUser')}
                    title="直接登录" />
                <Button
                    onPress={() => navigate('PasswordLogin')}
                    title="手势密码登录" />
                <Button
                    onPress={() => navigate('SetPassword')}
                    title="设置手势密码" />
            </View>
        );
    }
}


export default LoginScreen;
