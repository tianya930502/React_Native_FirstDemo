import React,{Component} from 'react';

import {
    Button,
    View,
    Text,
    StyleSheet,
} from 'react-native';

class MineScreen extends Component{
    static navigationOptions = {
        title: '我的',
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{backgroundColor:'#fff',flex:1, padding:10}}>
                <Button
                    onPress={() => navigate('ChangePass')}
                    title="修改密码" />
            </View>
        );
    }
}


export default MineScreen;
