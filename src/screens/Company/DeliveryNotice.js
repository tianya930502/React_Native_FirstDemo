import React from 'react';
import { Button, ScrollView, Text, AsyncStorage, StyleSheet, PanResponder } from 'react-native';
import { Pagination, Icon } from 'antd-mobile';
import * as Services from '../../services/dimensionality';

import DetailScreen from '../../components/DetailScreen/DetailScreen';
import CompanyBaseInfo from '../../components/CompanyBaseInfo';
import Table from '../../components/Table';
import { DealStorageData } from "../../utils/storage";

class DeliveryNoticeComScreen extends React.Component{
    static navigationOptions = {
        title: '送达公告',
    }
    constructor(props) {
        super(props);
        this.state = {
            allScreenConditions: '', // 所有筛选条件
            pagination: {
                currentPage: 1,
                pageSize: 5,
            },
            totalPage: 1,
            ListData: '', // 列表数据
            BaseinfoData: '', // 基础信息
        }
    }
    componentWillMount() {
        let isTrue = true;
        this._gestureHandlers = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true, // 在用户刚开始触摸时成为响应者
            onMoveShouldSetPanResponder: (evt, gestureState) => true, // 在用触摸点开始移动时成为响应者
            // 用户移动时执行的事件
            onPanResponderMove: (evt, gestureState) => {
                // console.log(gestureState.dx); // 用户移动的距离，向右为正，向左为负
                if(!gestureState.dy && isTrue) {
                    isTrue = false;
                    this.props.navigation.navigate('DrawerOpen');
                }
                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            },
            onPanResponderRelease: (evt, gestureState) => {
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
                isTrue = true;
            },
        })
    }

    componentDidMount() {
        AsyncStorage.multiGet(['staffNumber', 'secretKey', 'projectNo', 'queryName', 'queryNumber', 'queryType']).then(res => {
            const obj = DealStorageData(res);
            Services.getimensionality({...obj, ...{dataDimension: "delivery_notice", pageSize: 5}}).then(res => {
                if(res.isSuccess) {
                    console.log(res.datas);
                    this.setState({
                        ListData: res.datas.page.dataList,
                        totalPage: res.datas.page.totalPages,
                    })
                }
            })
            Services.getBaseInfoData({...obj, ...{dataDimension: "delivery_notice"}}).then(res => {
                if(res.isSuccess) {
                    console.log(res.datas.list);
                    this.setState({
                        BaseinfoData: res.datas.list,
                    })
                }
            })
        });
    }

    fetchList(dataDimension, currentPage, params){
        AsyncStorage.multiGet(['staffNumber', 'secretKey', 'projectNo', 'queryName', 'queryNumber', 'queryType']).then(res => {
            const obj = DealStorageData(res);
            const obj1 = {dataDimension: 'delivery_notice', pageSize: 5, currentPage: currentPage || 1};
            Services.getimensionality(Object.assign(obj, obj1, params || {})).then(res => {
                if(res.isSuccess) {
                    console.log(res.datas);
                    this.setState({
                        ListData: res.datas.page.dataList,
                        totalPage: res.datas.page.totalPages,
                        pagination: {
                            currentPage: currentPage,
                        }
                    })
                }
            })
        });
    }
    // 翻页
    Navigation(n) {
        const { allScreenConditions } = this.state;
        this.fetchList('delivery_notice', n, allScreenConditions);
    }

    render(){
        const { navigate } = this.props.navigation;
        const { BaseinfoData, ListData, pagination, totalPage } = this.state;
        const title = [
            {
                key: 'id',
                value: '#'
            },
            {
                key: 'caseNo',
                value: '案号'
            },
            {
                key: 'filingTime',
                value: '立案日期'
            },
            {
                key: 'deliveryNo',
                value: '字号'
            },
            {
                key: 'noticeType',
                value: '公告类型'
            },
            {
                key: 'courtName',
                value: '法院'
            },
            {
                key: 'party',
                value: '当事人'
            },
            {
                key: 'apiDataSource',
                value: '详情'
            },
        ];
        return(
            <ScrollView style={styles.container} {...this._gestureHandlers.panHandlers}>
                <CompanyBaseInfo BaseinfoData={BaseinfoData} />
                <Table title={title} ListData={ListData} />
                <Pagination total={totalPage}
                            className="custom-pagination-with-icon"
                            current={pagination.currentPage}
                            locale={{
                                prevText: (<Text>上一页</Text>),
                                nextText: (<Text>下一页</Text>),
                            }}
                            onChange={this.Navigation.bind(this)}
                />
                <Button onPress={() => navigate('DrawerOpen')} title='打开侧滑菜单' />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainerStyle: {
        height: 30,
        fontSize: 18,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        width: 250,
        marginLeft: 30,
    }
});

export default DeliveryNoticeComScreen;
