import React,{Component} from 'react';
import { Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Services from '../services/dimensionality';

import {
    View,
    StyleSheet,
    ImageBackground,
} from 'react-native';

class RegisterScreen extends Component{
    static navigationOptions = {
        title: '注册',
    }
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            Password: '',
            PasswordAgin: '',
        }
    }

    InputUserName(text) {
        console.log(text);
        this.setState({
            UserName: text,
        })
    }

    InputPassword(text) {
        console.log(text);
        this.setState({
            Password: text,
        })
    }

    InputPasswordAgin(text) {
        this.setState({
            PasswordAgin: text,
        })
    }

    Register = () => {
        const { navigate } = this.props.navigation;
        const { UserName, Password, PasswordAgin } = this.state;
        if(PasswordAgin !== Password) {
            Alert.alert('两次密码输入不一致，请重新输入');
            this.setState({
                PasswordAgin: '',
            })
        } else if(PasswordAgin === Password) {
            const obj = {
                name: UserName,
                password: Password,
                status: 'register',
            }
            Services.register(obj).then(res => {
                console.log(res);
                if(res.isSuccess) {
                    navigate('SetPassword');
                } else {
                    Alert.alert(res.message);
                }
            })
        }
    }

    render(){
        return(
            <ImageBackground source={require('./../image/bg.jpg')} style={styles.bg}>
                <View style={styles.login}>
                    <Input
                        inputContainerStyle={styles.inputContainerStyle}
                        containerStyle={{width: 250, marginBottom: 15}}
                        placeholder='请输入用户名'
                        leftIcon={<Icon name='user' size={18} />}
                        onChangeText={this.InputUserName.bind(this)}
                    />
                    <Input
                        inputContainerStyle={styles.inputContainerStyle}
                        containerStyle={{width: 250, marginBottom: 15}}
                        placeholder='请输入密码'
                        leftIcon={<Icon name='lock' size={18} />}
                        onChangeText={this.InputPassword.bind(this)}
                    />
                    <Input
                        inputContainerStyle={styles.inputContainerStyle}
                        containerStyle={{width: 250}}
                        placeholder='请再次输入密码'
                        value={this.state.PasswordAgin}
                        leftIcon={<Icon name='lock' size={18} />}
                        onChangeText={this.InputPasswordAgin.bind(this)}
                    />
                    <View style={styles.bottom}>
                        <Button
                            titleStyle={{ fontWeight: "700" }}
                            buttonStyle={styles.buttonStyle}
                            containerStyle={{ marginTop: 20 }}
                            title='注册'
                            onPress={this.Register}
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:null,
        height:null,
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        //resizeMode:Image.resizeMode.contain,
        //祛除内部元素的白色背景
        backgroundColor:'rgba(0,0,0,0)',
    },
    inputContainerStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        width: 250,
        backgroundColor: '#fff'
    },
    buttonStyle: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 120,
        height: 40,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 10
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})


export default RegisterScreen;
