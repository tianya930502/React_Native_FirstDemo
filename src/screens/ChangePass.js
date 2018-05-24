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

class ChangePassScreen extends Component{
    static navigationOptions = {
        title: '修改密码',
    }
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            OldPass: '',
            NewPass: '',
        }
    }

    InputUserName(text) {
        console.log(text);
        this.setState({
            UserName: text,
        })
    }

    InputOldPass(text) {
        console.log(text);
        this.setState({
            OldPass: text,
        })
    }

    InputNewPass(text) {
        this.setState({
            NewPass: text,
        })
    }

    Register = () => {
        const { navigate } = this.props.navigation;
        const { UserName, OldPass, NewPass } = this.state;
        const obj = {
            name: UserName,
            OldPass,
            NewPass,
        }
        Services.change(obj).then(res => {
            console.log(res);
            if(res.isSuccess) {
                navigate('Login');
            } else {
                Alert.alert(res.message);
                this.setState({
                    OldPass: '',
                    NewPass: '',
                })
            }
        })
    }

    render(){
        return(
            <View style={{flex:1, alignItems:'center',justifyContent:'center',}}>
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
                    placeholder='请输入原密码'
                    value={this.state.OldPass}
                    leftIcon={<Icon name='lock' size={18} />}
                    onChangeText={this.InputOldPass.bind(this)}
                />
                <Input
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={{width: 250}}
                    placeholder='请输入新密码'
                    value={this.state.NewPass}
                    leftIcon={<Icon name='lock' size={18} />}
                    onChangeText={this.InputNewPass.bind(this)}
                />
                <View style={styles.bottom}>
                    <Button
                        titleStyle={{ fontWeight: "700" }}
                        buttonStyle={styles.buttonStyle}
                        containerStyle={{ marginTop: 20 }}
                        title='确定修改'
                        onPress={this.Register}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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


export default ChangePassScreen;
