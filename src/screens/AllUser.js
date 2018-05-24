import React,{Component} from 'react';
import Button from 'apsl-react-native-button'
import * as Services from '../services/dimensionality';
import * as Storage from '../utils/storage';

import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    AsyncStorage,
} from 'react-native';

class AllUserScreen extends Component{
    static navigationOptions = {
        title: '用户',
    }
    constructor(props) {
        super(props);
        this.state = {
            PeopleList: [], // 个人用户列表
            CompanyList: [], // 企业用户列表
        }
    }
    componentDidMount() {
        Services.getAllUsers().then(res => {
            if (res.isSuccess) {
                const list = res.datas.list;
                const CompanyList = [];
                const PeopleList = [];
                list.forEach(item => {
                    if(item.queryType === 2) {
                        CompanyList.push(item)
                    } else if(item.queryType === 1) {
                        PeopleList.push(item);
                    }
                })
                this.setState({
                    PeopleList,
                    CompanyList,
                })
            }
        })
    }

    SkipPeople(item) {
        const { navigate } = this.props.navigation;
        navigate('ExecutionAnnouncement');
        AsyncStorage.setItem('queryNumber', `${item.idNo === undefined ? '' : item.idNo}`);
        AsyncStorage.setItem('queryName', `${item.queryName === undefined ? '' : item.queryName}`);
        AsyncStorage.setItem('queryType', `${item.queryType === undefined ? '' : item.queryType}`);
        AsyncStorage.setItem('readStatus', `${item.readStatus === undefined ? '' : item.readStatus}`);
    }
    SkipCompany(item) {
        const { navigate } = this.props.navigation;
        navigate('ExecutionAnnouncementCom');
        AsyncStorage.setItem('queryName', `${item.queryName === undefined ? '' : item.queryName}`);
        AsyncStorage.setItem('queryType', `${item.queryType === undefined ? '' : item.queryType}`);
        AsyncStorage.setItem('readStatus', `${item.readStatus === undefined ? '' : item.readStatus}`);
    }

    render(){
        const { PeopleList, CompanyList } = this.state;
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.text}>个人用户：</Text>
                <View style={styles.people} >
                    {
                        PeopleList.length > 0 ? PeopleList.map((item, index) => {
                            return (
                                <Button key={index} style={{height: 30, backgroundColor: '#69c0ff'}} textStyle={{fontSize: 14}} onPress={this.SkipPeople.bind(this, item)}>
                                    {item.queryName}
                                </Button>
                            )
                        }) : ''
                    }
                </View>
                <Text style={styles.text}>企业用户：</Text>
                <View style={styles.people}>
                    {
                        CompanyList.length > 0 ? CompanyList.map((item, index) => {
                            return (
                                <Button key={index} style={{height: 30, backgroundColor: '#69c0ff', }} textStyle={{fontSize: 14}} onPress={this.SkipCompany.bind(this, item)}>
                                    {item.queryName}
                                </Button>
                            )
                        }) : ''
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 18,
    },
    people: {
        padding:30,
    },
    button: {
        width:300,
    },
});

export default AllUserScreen;
