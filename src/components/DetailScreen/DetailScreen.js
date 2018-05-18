import React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Services from '../../services/queryRegion';
import ScreenItem from './ScreenItem';
import SelectDate from './SelectDate';

class DetailScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpenDetailScreen: false,
            layoutData: this.props.layoutData, // 配置数据,父组件传过来的
            startTime: '', // 开始时间
            endTime: '', // 结束时间
            caseNum: '', // 案号
            regionArr: '', // 省份的筛选条件
            isOpenScreen: false, // 是否显示详细筛选
            // 筛选的所有内容
            detailScreen: {
                screenTime: {
                    startTime: '',
                    endTime: '',
                }, // 筛选的时间
                screenCondition: [], // 筛选的条件
            },
        }
    }

    componentWillMount() {
        const { region } = this.props.layoutData;
        if (region && region.isHave) {
            const params = region.params;
            AsyncStorage.getItem('idNo').then(res => {
                params.queryNumber = res;
                console.log(params);
                Services.queryRegion(params).then((res) => {
                    console.log(res);
                    if (res && res.isSuccess && res.datas.regions.length > 0) {
                        this.setState({
                            regionArr: res.datas.regions,
                        });
                    }
                });
            });
        }
    }

    // 获取立案开始时间, 从组件中获取的是时间戳，可以通过moment的方法转为标准格式
    getStartTime(value) {
        const { detailScreen } = this.state;
        const screenTime = detailScreen.screenTime;
        screenTime.startTime = value;
        this.setState({
            startTime: value,
            detailScreen,
        });
    }

    // 获取立案结束时间, 从组件中获取的是时间戳，可以通过moment的方法转为标准格式
    getEndTime(value) {
        const { detailScreen } = this.state;
        const screenTime = detailScreen.screenTime;
        screenTime.endTime = value;
        this.setState({
            endTime: value,
            detailScreen,
        });
    }

    // 输入案号
    InputCaseNum(text) {
        console.log(text);
    }

    // 重置-清除所选数据
    Reset() {
        const obj = {
            screenTime: {
                startTime: '',
                endTime: '',
            },
            screenCondition: [],
        };
        this.setState({
            startTime: '', // 开始时间
            endTime: '', // 结束时间
            detailScreen: obj,
        });
    }

    // 确定筛选,把所有筛选的条件转成接口需要的格式，并且包装成一个对象传给父组件
    ConfirmScreen() {
        const { screenCondition, screenTime: { startTime, endTime } } = this.state.detailScreen;
        const { startTimeName, endTimeName } = this.state.layoutData;
        let apiDataSource = ''; // 渠道来源
        let caseType = ''; // 案件类型
        let role = ''; // 角色
        let caseReason = ''; // 案由
        let region = ''; // 省份
        screenCondition.map((obj) => {
            switch (obj.title) {
                case '渠道来源':
                    apiDataSource = obj.arr.toString().replace('正信用', 'zheng_xin_yong').replace('法海', 'fa_hai').replace('汇法', 'hui_fa')
                        .replace(/\,/g, '|');
                    break;
                case '案件类型':
                    caseType = obj.arr.toString().replace('刑事', '1').replace('民事', '2').replace('商业', '3')
                        .replace('执行', '4')
                        .replace('行政', '5')
                        .replace('其它', '6')
                        .replace('其他', '6');
                    break;
                case '角色':
                    role = obj.arr.toString().replace('其它', 'rest').replace('其他', 'rest');
                    break;
                case '案由':
                    caseReason = obj.arr.toString().replace('金融借贷类纠纷', '1').replace('其它', '2').replace('其他', '2');
                    break;
                case '省份':
                    region = obj.arr.toString();
                    break;
                default:
                    break;
            }
            return true;
        });
        const obj = {};
        obj[startTimeName] = startTime;
        obj[endTimeName] = endTime;
        this.props.DetailScreen({ ...obj, apiDataSource, caseType, role, caseReason, region });
    }

    // 用来判断我们是否选过某种title的数据，如果选过的话直接在里面添加数据，否则添加该种类型的数据
    DefaultDate(arr, title) {
        const str = arr.some((data, index) => {
            return data.title === title;
        });
        if (!str) {
            return [];
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].title === title) {
                return arr[i].arr;
            }
        }
    }

    // 每一次点击筛选条件时都会整理所有筛选条件，整理成[{title:'',arr:[]},{title:'',arr:[]}...]的格式
    DealData(title, value) {
        const { detailScreen } = this.state;
        const screenCondition = detailScreen.screenCondition;
        const str = screenCondition.some(data => {
            return data.title === title;
        });
        // 如果不存在该title，则把数据放进去
        if (!str) {
            screenCondition.push({
                title,
                arr: value,
            });
        }
        // 如果存在该title，则把对应的数据替换成最新的数据
        for (let i = 0; i < screenCondition.length; i++) {
            if (screenCondition[i].title === title) {
                screenCondition[i].arr = value;
            }
        }
        this.setState({
            detailScreen,
        });
    }

    // 用来判断我们是否选过某种title的数据，如果选过的话直接在里面添加数据，否则添加该种类型的数据
    DefaultDate(arr, title) {
        const str = arr.some((data, index) => {
            return data.title === title;
        });
        if (!str) {
            return [];
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].title === title) {
                return arr[i].arr;
            }
        }
    }

    render(){
        const { isOpenDetailScreen, layoutData, detailScreen, startTime, endTime, regionArr } = this.state;
        return(
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <Input
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{fontSize: 14}}
                        placeholder='输入案号进行搜索'
                        onChangeText={this.InputCaseNum.bind(this)}
                        rightIcon={{ name: 'search', color: '#666' }}
                    />
                    <Text style={styles.text} onPress={() => {this.setState({isOpenDetailScreen: !isOpenDetailScreen })}}>
                        详细筛选 <Icon name={isOpenDetailScreen ? 'chevron-up' : 'chevron-down'} />
                    </Text>
                </View>
                {
                    isOpenDetailScreen ?
                        <View style={styles.detailScreen}>
                            {
                                layoutData.detailScreenCondition.map((item, index) => {
                                    return (<ScreenItem
                                        key={index}
                                        title={item.title}
                                        value={this.DefaultDate(detailScreen.screenCondition, item.title)}
                                        data={item.arr}
                                        onScreen={this.DealData.bind(this, item.title)}
                                    />);
                                })
                            }
                            {
                                layoutData.region && layoutData.region.isHave && regionArr ? <ScreenItem
                                    title="省份"
                                    value={this.DefaultDate(detailScreen.screenCondition, '省份')}
                                    data={regionArr}
                                    onScreen={this.DealData.bind(this, '省份')}
                                /> : null
                            }
                            <SelectDate
                                title={layoutData.dateType || '立案日期'}
                                startTime={startTime}
                                endTime={endTime}
                                getStartTime={this.getStartTime.bind(this)}
                                getEndTime={this.getEndTime.bind(this)}
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <Button containerStyle={{margin: 5}} titleStyle={{fontSize: 12, color: '#000'}} buttonStyle={{backgroundColor: '#d9d9d9'}} onPress={this.Reset.bind(this)} title='重置' />
                                <Button containerStyle={{margin: 5}} titleStyle={{fontSize: 12}} onPress={this.ConfirmScreen.bind(this)} title='确定筛选' />
                            </View>
                        </View> : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginRight: 30,
        color: '#1890ff',
    },
    inputContainerStyle: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        width: 250,
        marginLeft: 30,
    },
    detailScreen: {
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5,
        paddingTop: 10,
        paddingBottom: 5,
    }
});


export default DetailScreen;
