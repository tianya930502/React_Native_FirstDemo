import React,{Component} from 'react';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Services from '../services/dimensionality';

import {
    View,
    StyleSheet,
    ImageBackground,
    Alert,
} from 'react-native';

class LoginScreen extends Component{
    static navigationOptions = {
        title: '登录',
    }
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            Password: '',
        }
    }

    Login() {
        const { UserName, Password } = this.state;
        const { navigate } = this.props.navigation;
        const obj = {
            name: UserName,
            password: Password,
        }
        Services.login(obj).then(res => {
            console.log(res);
            if(res.isSuccess) {
                navigate('Home');
            } else {
                Alert.alert(res.message);
            }
        })
    }

    InputUserName(text) {
        this.setState({
            UserName: text,
        })
    }

    InputPassword(text) {
        this.setState({
            Password: text,
        })
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <ImageBackground source={require('./../image/bg.jpg')} style={styles.bg}>
                <View>
                    <Button
                        style={{marginBottom:10}}
                        onPress={() => navigate('Home')}
                        title="直接登录" />
                    <Button
                        style={{marginBottom:10}}
                        onPress={() => navigate('PasswordLogin')}
                        title="手势密码登录" />
                    <Button
                        style={{marginBottom:10}}
                        onPress={() => navigate('SetPassword')}
                        title="设置手势密码" />
                </View>
                <View style={styles.login}>
                    <Input
                        inputContainerStyle={styles.inputContainerStyle}
                        containerStyle={{width: 250, marginBottom: 15}}
                        placeholder='Username'
                        leftIcon={<Icon name='user' size={18} />}
                        onChangeText={this.InputUserName.bind(this)}
                    />
                    <Input
                        inputContainerStyle={styles.inputContainerStyle}
                        containerStyle={{width: 250}}
                        placeholder='Password'
                        leftIcon={<Icon name='lock' size={18} />}
                        onChangeText={this.InputPassword.bind(this)}
                    />
                    <View style={styles.bottom}>
                        <Button
                            title='登录'
                            titleStyle={{ fontWeight: "700" }}
                            buttonStyle={styles.buttonStyle}
                            containerStyle={{ marginTop: 20 }}
                            onPress={this.Login.bind(this)}
                        />
                        <Button
                            titleStyle={{ fontWeight: "700" }}
                            buttonStyle={styles.buttonStyle}
                            containerStyle={{ marginTop: 20 }}
                            title='注册'
                            onPress={() => navigate('Register')}
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
    login: {

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
        justifyContent: 'space-between'
    }
})


export default LoginScreen;
