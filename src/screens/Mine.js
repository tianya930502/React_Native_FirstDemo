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
            <View style={{backgroundColor:'#fff',flex:1}}>
                <Text style={{padding:20}}>this is Mine page</Text>
                {/*<Button*/}
                    {/*onPress={() => navigate('AllUser')}*/}
                    {/*title="直接登录" />*/}
            </View>
        );
    }
}


export default MineScreen;
